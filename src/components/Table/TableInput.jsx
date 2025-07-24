import React, { memo, useState } from "react";
import { DATE, KORIB_CHIQILMOQDA, NUMBER, SELECT, STRING, MONTH } from "../../constants";
import { useSelector } from "react-redux"
import { Delete } from "../../assets";
import DateInput from "../dateInput";


const TableInput = (prop) => {
  const { alloptions, isSendCheck } = useSelector((state) => state.storedDataReducer);
  const row = prop?.row;
  const name = prop?.name
  const item = prop?.item;
  const deleteItem = prop?.deleteItem;
  const index = prop?.index;
  const onChangeInput = prop?.onChangeInput;
  const values = prop?.values;
  const chechDisabled = isSendCheck === KORIB_CHIQILMOQDA
  const ref2 = prop?.ref2;

  
  function inputColumn(col, index) {
    const [isOpenDate, setIsOpenDate] = useState(false);
    let input = null;
    // const handleOpenDateinput = () => (col?.disabled ? col?.disabled : chechDisabled) ? "" : setIsOpenDate(true)

    
    switch (col?.type) {
      case STRING:
        input = (
          <input
            type="text"
            readOnly={((values?.gender === "2") && item?.isGender) ? item?.isGender : col?.disabled ? col?.disabled : chechDisabled}
            className={"table-input"}
            autoComplete="off"
            key={name+"."+index+"." + col?.field}
            id={name+"."+index+"." + col?.field}
            defaultValue={col?.defaultValue}
            value={item && item[col?.field]}
            // required={((values?.gender === "2") && item?.isGender) ? !item?.isGender : col?.required}
            name={col?.field}
            style={{...col.style, textAlign: "center" }}
            onChange={(e) => onChangeInput({ ...item, [col?.field]: e.target.value })}
          />
        );
        break;

      case NUMBER:
        input = (
          <input
            type="number"
            value={item && item[col?.field]}
            title={col?.title}
            autoComplete="off"
            className={"table-input"}
            name={col?.field}
            key={name+"."+index+"." + col?.field}
            // required={col?.required}
            min={0}
            id={name+"."+index+"." + col?.field}
            style={{ ...col.style, textAlign: "center" }}
            readOnly={col?.disabled ? col?.disabled : chechDisabled}
            onChange={(e) => onChangeInput({ ...item, [col?.field]: e.target.value })}
          />
        );
        break;

      case SELECT:
        input = (
          <select
            defaultValue={col?.defaultValue}
            value={ (item && item[col?.field]) || col?.defaultValue}
            disabled={ ((values?.gender === "2") && item?.isGender) ? item?.isGender : col?.disabled ? col?.disabled : chechDisabled} //? gander check
            name={col?.field}
            autoComplete="off"
            id={name+"."+index+"." + col?.field}
            key={name+"."+index+"." + col?.field}
            className={"table-input"}
            // required={((values?.gender === "2") && item?.isGender) ? !item?.isGender : col?.required} //? gander check
            style={{ ...col.style, textAlign:"center" }}
            onChange={(e) => onChangeInput({ ...item, [col?.field]: e.target.value }) }
          >
            <option />
            {alloptions && alloptions[col?.options]?.map(option => <option value={option?.id} key={option?.name}> {option?.name} </option>)}
          </select>
        );
        break;

      case DATE:
      // const handleOpenDateinput = () => (col?.disabled ? col?.disabled : chechDisabled) ? "" : setIsOpenDate(true)

        input = (
          <input
            type="date"
            min="1900-01"
            value={item && item[col?.field]}
            disabled={col?.disabled ? col?.disabled : chechDisabled}
            id={name+"."+index+"." + col?.field}
            key={name+"."+index+"." + col?.field}
            autoComplete="off"
            className={"table-input"}
            style={{  ...col.style, textAlign: "center", }}
            name={col?.field}
            onChange={(e) => onChangeInput({ ...item, [col?.field]: e.target.value })}
          />
          // <div className={"table-input date-input"} onClick={handleOpenDateinput} id={name+"."+index+"." + col?.field} style={{  ...col.style, textAlign: "center"}}>
          //   <DateInput 
          //     value={item && item[col?.field]} 
          //     name={col?.field} 
          //     onChange={(e) => onChangeInput({ ...item, ...e })} 
          //     isOpenDate={isOpenDate} 
          //     setIsOpenDate={setIsOpenDate}
          //     />
          //     <span style={{textAlign:"center",width:"100%"}}>{item && item[col?.field]}</span>
          // </div>
        )
        break;
        
        case MONTH:
      const handleOpenDateinput = () => (col?.disabled ? col?.disabled : chechDisabled) ? "" : setIsOpenDate(true)
        input = (
          // <input
          //   type="date"
          //   min="1900-01"
          //   value={item && item[col?.field]}
          //   disabled={col?.disabled ? col?.disabled : chechDisabled}
          //   id={name+"."+index+"." + col?.field}
          //   key={name+"."+index+"." + col?.field}
          //   autoComplete="off"
          //   className={"table-input"}
          //   style={{  ...col.style, textAlign: "center", }}
          //   name={col?.field}
          //   onChange={(e) => onChangeInput({ ...item, [col?.field]: e.target.value })}
          // />
          <div className={"table-input date-input"} onClick={handleOpenDateinput} id={name+"."+index+"." + col?.field} style={{  ...col.style, textAlign: "center"}}>
            <DateInput 
              value={item && item[col?.field]} 
              name={col?.field} 
              col={col}
              onChange={(e) => onChangeInput({ ...item, ...e })} 
              isOpenDate={isOpenDate} 
              setIsOpenDate={setIsOpenDate}
            />
              <span style={{textAlign:"center",width:"100%"}}>{item && item[col?.field]}</span>
          </div>
        )
        break;

      default:
        break;
    }
    return input;
  }


  return (
    <tr >
      {row && row?.map(col => 
          <td
            colSpan={col?.colSpan}
            rowSpan={col?.rowSpan}
            key={col?.title}
            height="35px"
            style={{ ...col.style, }}
            title={item[col?.field] ?? ""}
          >
            {col?.render ? (
              col?.render(item, index)
            ) : col?.delete ? (
              <div ref={col?.tour?.isTour === "ref2" ? ref2 : null}  className="wtable__tr-x" >
                <button disabled={chechDisabled} type="button" onClick={() => deleteItem(item?.id, item, col)} style={{ ...col.style}} > <Delete /> </button>
              </div>
            ) : col?.sequence ? (
              <div className="d__flc_aic">{index + 1}</div>
            ) : col.type ? (
              <div style={{ width: "100%", height: "100%", }}>
                {inputColumn(col, index)}
              </div>
            ) : <div style={{ width: "100%", height: "100%", textAlign:"center", ...col.style }}>
                  {item[col?.field]}
                </div> }
          </td>)}
    </tr>
  );
};

export default memo(TableInput);
