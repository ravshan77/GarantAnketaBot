import { GET } from "./method";
import { message } from "antd";
import { setAllOptionsData } from "../redux";


 function getOptions({ optionsUrl, dispatch }) {
  Object.keys(optionsUrl)?.forEach((key) => {
    GET(optionsUrl[key])
      .then((res) => {
        dispatch(setAllOptionsData({ [key]: res.data.data }));
      })
      .catch((err) => {
        message.error(err.message);
      });
  });
}

export default getOptions;
