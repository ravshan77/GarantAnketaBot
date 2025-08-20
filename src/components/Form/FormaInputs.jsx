import { useState, memo, useRef } from 'react'
import { useSelector } from "react-redux";
import ModalInput from './Inputs';
import { Button, message, Modal, Popover, Tour } from 'antd';
import { useTelegram } from '../../hooks/useTelegram';
import { POST } from '../../server/method';
import { anketaForma } from '../../templates';
import { anketaValidate } from '../../schema/validates';
import { Info } from '../../assets';
import { sendBotError } from '../../functions/sendBotError';



const FormaInputs = () => {
    const { values } = useSelector(state => state.valuesReducer)
    const currentPage = anketaForma.form
    const [saveLoading, setSaveLoading] = useState(false)
    const { isSendCheck } = useSelector(state => state?.storedDataReducer);
    const { onClose, user} = useTelegram();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [checkConf, setCheckConf] = useState(false)
    const [isConformInfoModal, setIsConformInfoModal] = useState(false);
    
    const handleConform = () => setIsConformInfoModal(prev => !prev)

    
    const handOpenModal = (e) => {
        e.preventDefault();
        const sendValues = {...currentPage?.sendDeafultValue, ...values};
        const errors = anketaValidate(sendValues)?.validate(sendValues);
        if (errors?.length > 0) {
            document.getElementById(errors[0]?.path).style.border = '1px solid red'
            document.getElementById(errors[0]?.path)?.focus()            
            document.getElementById(errors[0]?.path)?.scrollIntoView({ behavior: 'smooth', block: 'center' })       
            message.warning(errors[0].message, 3.5)

            setTimeout(() => {
              document.getElementById(errors[0]?.path)?.blur()
              document.getElementById(errors[0]?.path).style.border = ""
           }, 3500);

           return ;
        } else if(!values?.position || (values?.position?.length <= 0)){ // position validatsiyasida muammo bo'lgani uchun alohida tekshirildi
            document.getElementById("position").style.border = '1px solid red'
            document.getElementById("position")?.scrollIntoView()        
            message.warning("Lavozim tanlang", 2.5)
            
            setTimeout(() => {
                document.getElementById("position")?.blur()
                document.getElementById("position").style.border = ""
            }, 1500);
            return ;
            
        } else{

            if (!checkConf) {
                document.getElementById("chechboxConf").style.border = '1px solid red'
                document.getElementById("chechboxConf")?.focus()
                message.warning("Rozilik shartlarini tasdiqlang", 2.5)
    
                setTimeout(() => {
                  document.getElementById("chechboxConf")?.blur()
                  document.getElementById("chechboxConf").style.border = ""
               }, 1500); 
               return
            }else{
                setIsOpenModal(true)
            }

        }
    }

    const SubmitModal = () => {

      const onSubmit = async (e) => {
          e.preventDefault();
          const sendValues = {...currentPage?.sendDeafultValue, ...values};
          const errors = anketaValidate(sendValues)?.validate(sendValues);

          if (errors?.length > 0) {
              errors?.map(err => message.warning(err.message) )
              // errors?.map(err => alert(err.message))
              return ;
          }
          setSaveLoading(true)
          await POST(currentPage?.url, {...currentPage?.sendDeafultValue, ...values,  chat_id: user?.id }).then(res => {
              if (res.status === 200) {
                  message.success("Anketangiz yuborildi")
                  setIsOpenModal(false)
                  onClose()
              } else{
                sendBotError(res, "Anketa yuborishda xato");
              }
          }).catch(err => {
            sendBotError(err, "Anketa yuborishda xato");
            message.error(JSON.stringify(err.message))
          }).finally(() => setSaveLoading(false))
      }   


        return <Modal open={isOpenModal} width={400} closable={false} centered={true} footer={null}>
                  <form onSubmit={onSubmit} style={{fontSize:"14px", padding:"20px", fontWeight:"500", fontFamily:"sans-serif", letterSpacing:"1px",}}>
                        Anketangiz yuborilsinmi?
                        <br />
                        <br />
                        <div style={{display:"flex", justifyContent:"flex-end"}}>
                            <Button onClick={() => setIsOpenModal(false)} style={{borderRadius:"1px", bottom:"0", left:"0", height:"35px", width:"90px",  fontSize:"16px", marginRight:"10px"}} disabled={saveLoading} htmlType="button">Yo'q</Button>
                            <Button type='primary' style={{borderRadius:"1px", bottom:"0", left:"0", height:"35px", fontSize:"16px", width:"90px",}}  htmlType="submit" loading={saveLoading}>Xa</Button>
                        </div>
                  </form>
                </Modal>
    }

    const ConformInfoModal = () => {
        const closeConformCheck = () => {
            setCheckConf(true)
            setIsConformInfoModal(false)
        }

        return <Modal title={<span style={{fontSize:"16px", fontWeight:"700"}}>Rozilik shartlari</span>} open={isConformInfoModal} centered={true} footer={null} onCancel={handleConform}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{padding:"10px 20px 0 20px", fontSize:"15px", fontWeight:"500"}}>Rozilik shartlarini tasdiqlash orqali siz o'zingizning shaxsiy ma'lumotlaringizni kompaniya maqsadlarida qayta ishlash uchun ularni saqlashga, foydalanishga va o'zaro almashishga rozilik bildirasiz. Shuningdek, ushbu anketada siz taqdim etgan barcha ma'lumotlar ishonchli ekanligi va yolg'on ma'lumot uzatilishi holatlari aniqlangan taqdirda barcha javobgarlikni o'z zimmangizga olasiz!</p>
                    <Button type='primary' onClick={closeConformCheck} style={{borderRadius:"1px", height:"35px", fontSize:"16px", width:"90px", marginBottom:"20px"}} htmlType="button" loading={saveLoading}>Roziman</Button>
                </div>
            </Modal>
    }
// go new version code
    const noteLabel =  <span style={{color:"var(--primary)"}}>(xatolik ro'y bersa bizga bog'laning: <a href='https://t.me/paloncha'>@yordam</a>)</span>

    const content = ({text}) => (
        <div style={{width:"100%"}}>
          <p style={{width:"100%", padding:"0", margin:"0"}}>{text}</p>
        </div>
      );

      const ref1 = useRef(null);
      const ref2 = useRef(null);
      const ref3 = useRef(null);
      const ref4 = useRef(null);
      const [open, setOpen] = useState(true);

  
      const steps = [
        {
          title: 'Assalomu Alaykum.',
          description: "Botdan to'g'ri foydalanish uchun quyidagi amallar bilan tanishib chiqing!",
          target: null,
        },
        {
          title: "Jadvalga yangi qator qo'shish.",
          description: "➕ tugmasini bosish orqali jadvalga yangi qator qo'shish mumkin.",
          target: () => ref1.current,
        },
        {
          title: "Jadvaldagi qatorni o'chirish.",
          description: "Jadvaldagi qatorni o'chirish uchun, ushbu 🗑 o'chirish tugmasini bosing.",
          target: () => ref2.current,
        },
        {
          title: "Savol haqida qo'shimcha ma'lumot.",
          description: "Ushbu belgini bosish orqali, savol haqida to'liqroq ma'lumot olishingiz mumkin.",
          target: () => ref3.current,
        },
        {
          title: "Majburiy savollar!",
          description: "Ushbu * belgisi bor maydon, to'ldirilishi shart bo'lgan maydon hisoblandi.",
          target: () => ref4.current,
        },
      ];  



    return (
        <div style={{ padding: "25px", width: "auto", height: "auto", }}>
            <form onSubmit={handOpenModal} id="form" style={{ width: "auto", height: "auto" }} autoComplete="off">
                <div className="form" style={{ gridTemplateColumns: currentPage?.gridTemplates?.columns, gridTemplateRows: currentPage?.gridTemplates?.rows }}>
                    {currentPage?.inputs?.map((input, i) => { 
                       return <div className="form-item" style={{ gridColumn: input?.gridColumn, gridRow: input?.gridRow }} key={i + "input_wrap"}>
                           <div style={{display:"flex", alignItems:"end", justifyContent:"space-between"}}>
                              {input?.label ? <label style={{ marginLeft:`${input?.WTable?.newRow ? "35px" : 0}`}} htmlFor={input?.name} ref={input?.tour?.isTour === "ref4" ? ref4 : null} >{input?.label +  `${input?.required ? " * " :  ""} `} {(input?.name === "image" && isSendCheck === "YANGI") ? noteLabel : null}</label> : null}
                              {input?.popupInfo ? <Popover placement="bottomRight" title={input?.popupInfo?.title} trigger="click" content={content({text: input?.popupInfo?.infoText})}>
                                <span ref={input?.tour?.isTour === "ref3" ? ref3 : null} style={{ display:"flex", alignItems:"end", cursor:"pointer"}}><Info /></span>
                              </Popover> : null}
                            </div> 
                            
                            <ModalInput {...input} ref1={ref1} ref2={ref2} ref4={ref4} setSaveLoading={setSaveLoading} values={values} saveLoading={saveLoading} />
                        </div>}
                    )}
                        <div className="form-item" style={{ gridColumn: "1 / 9", gridRow: "56 / 57" }}>
                          <div style={{display:"flex", alignItems:"center"}}>
                            <input
                              style={{width:"20px", height:"20px"}}
                              type='checkbox'
                              id="chechboxConf"
                              checked={(isSendCheck !== "YANGI") ? true : checkConf}
                              onChange={()=> setCheckConf(prev => !prev)}
                            />
                            { <label htmlFor={"chackbox"} style={{marginLeft:"10px"}} > Roziman * <span onClick={handleConform} style={{color:"var(--primary)"}}>(Rozilik shartlari bilan tanishish)</span></label>}
                          </div>
                        </div>
                </div>
                <SubmitModal />
                {(isSendCheck === "YANGI") && !values?.first_name  ? <Tour  open={open} onClose={() => setOpen(false)} steps={steps} /> : null}
                <ConformInfoModal/>
                {/* {<Button loading={saveLoading} htmlType="submit" type="primary" style={{borderRadius:"1px", width:"100%", position:"absolute", bottom:"0", left:"0", height:"50px", fontSize:"16px"}}>Anketani yuborish</Button>} */}
                {isSendCheck === "YANGI" ? <Button loading={saveLoading} htmlType="submit" type="primary" style={{borderRadius:"1px", position:"absolute", width:"100%", bottom:"0", left:"0", height:"50px", fontSize:"16px"}}>Anketani yuborish</Button> : null}
                {/* <Button loading={saveLoading} htmlType="submit" type="primary" style={{borderRadius:"1px", position:"absolute", width:"100%", bottom:"0", left:"0", height:"50px", fontSize:"16px"}}>Anketani yuborish</Button> */}
            </form>
        </div>
    )
}


export default memo(FormaInputs)
        

