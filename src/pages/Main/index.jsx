import React, {memo, useEffect} from "react";
import { useTelegram } from "../../hooks/useTelegram";
const Forma = React.lazy( () => import("../../components/Form/Forma"))

const Main = () => {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready()
    tg.enableClosingConfirmation()

  }, []);


  return (
    // <div style={{display:"flex"}}>
      <Forma />
    // </div>
  )
}

export default memo(Main)