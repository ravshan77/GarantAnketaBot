import "./forma.scss";
import { message } from "antd";
import FormaHeader from "./FormaHeader";
import FormaInputs from "./FormaInputs";
import uuid from "../../functions/uuid";
import { memo, useEffect } from "react";
import { GET } from "../../server/method";
import { anketaForma } from "../../templates";
import { checkAnketa } from "../../constants";
import getOptions from "../../server/getOptions";
import { useTelegram } from "../../hooks/useTelegram";
import { useDispatch, useSelector } from "react-redux";
import { setCheckAnketa, setValues } from "../../redux";
// import logOut from "../../functions/logOut";

const Forma = () => {
  const dispatch = useDispatch();
  const { user } = useTelegram();
  const { values } = useSelector((state) => state.valuesReducer);

  // anketa_childrens: [{ gender: "", date: "", uuid: uuid(), id:null }], bolalari qo'shildi, ref uchun (tour) .
  useEffect(() => {
    getOptions({ optionsUrl: anketaForma?.form?.optionsUrl, dispatch });

    async function anketaLockalValue() {
      /* Qachonki candidant anketa topshirganda va uning anketasi ko'rib chiqilayotganda, U boshqa telegram accountdan kirganida uning oldin to'ldirgan ma'lumotlarini to'iq qayta kursatish uchun kerak */
      await GET(`/anketa-web-app/show/${user?.id}`).then((res) => {
        if (res.status === 200) {
          dispatch(setValues({ ...res.data.data }));
        }
      });
    }

    async function checkUserAnketa() {
      await GET(`/anketa-web-app/check/${user?.id}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setCheckAnketa(checkAnketa(res?.data)));
            if (res?.data === 0) {
              //! YANGI
              dispatch(
                setValues({
                  position: [],
                  anketa_relations: [ { who: "", date: "", job: "", uuid: uuid(), id: null } ],
                  anketa_languages: [ { name: "", level: "", uuid: uuid(), id: null } ],
                  anketa_progs: [ { name: "", level: "", uuid: uuid(), id: null } ],
                  anketa_worked_befores: [ { start_date: "", end_date: "", company_name: "", position: "", uuid: uuid(), id: null } ],
                  education_place: [ { start_date: "", education_name: "", end_date: "", specialty: "", uuid: uuid(), id: null } ],
                  ...values,
                })
              );
            } else if (res?.data !== 0) {
              //! KORIB_CHIQILMOQDA
              anketaLockalValue();
            }
          }
        })
        .catch((err) => message.error(err.message));
    }
    checkUserAnketa();
  }, []);

  return (
    <div className="anketa_wrapper">
      <div className="anketa">
        <div className="scra">
          <FormaHeader />
          {/* <button style={{ marginLeft: "40px" }} onClick={() => logOut()}> Clear</button> */}
          <FormaInputs />
        </div>
      </div>
    </div>
  );
};

export default memo(Forma);
