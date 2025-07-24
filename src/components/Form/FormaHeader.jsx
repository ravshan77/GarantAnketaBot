import React, { memo } from 'react'
import { KORIB_CHIQILMOQDA } from '../../constants'
import { useSelector } from "react-redux";
import {logOut} from "../../functions"

const FormaHeader = () => {
  const { isSendCheck } = useSelector(state => state?.storedDataReducer);
  const chechDisabled = isSendCheck === KORIB_CHIQILMOQDA;
  
  return (
    <div>
      <h2 onClick={logOut} style={{ height:"35px", margin:"0", textAlign:"center", fontFamily:"sans-serif", fontWeight:"700", marginTop:"30px"}}> { chechDisabled ? "Sizning anketangiz" : "Anketa to'ldirish"}</h2>
    </div>
  )
}

export default memo(FormaHeader)