import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DATE, SELECT, STRING, UPLOAD_IMAGE, NUMBER, DEPENDENT_ON_ANOTHER_STRING, WTABLE, DEPENDENT_ON_ANOTHER_SELECT, MULTIPLE_SELECT, KORIB_CHIQILMOQDA, TEXTAREA, PHONE, WTABLE_CHILDREN_CONECT_MARTIAL_STATUS, WOMAN_GENDER_CHECK_MULTIPLE_SELECT } from "../../constants";
import { setValues } from "../../redux";
import MainWTable from "../Table/Table";
import uuid from "../../functions/uuid";
import Select from 'react-select';
import NumberFormat from "react-number-format";
import HtmlUploader from "./HtmlUploader";
import DateInput from "../dateInput";
// import UpLoadImage from "./UpLoadImage";



const Inputs = (props) => {
  const dispatch = useDispatch();
  let input = null;
  const { alloptions, isSendCheck } = useSelector(state => state?.storedDataReducer);
  const chechDisabled = isSendCheck === KORIB_CHIQILMOQDA
  const { values, name, inFunc, type, disabled, options, maxLength, height, actionUrl, placeholder, minLength, observeValue,deletImage, WTable, setSaveLoading, saveLoading, rows, labelName, ref1, ref2,} = props;
  const handleChange = target => dispatch(setValues({ ...values, ...target }))
  const getValues = (inputName) => values && values[inputName];
  const [isOpenDate, setIsOpenDate] = useState(false);
    
  

  switch (type) {
    case SELECT:
      input = (
        <div>
          <select
            name={name}
            className="label-input"
            autoComplete="off"
            id={name}
            // required={required}
            style={{ height:"38px !important"}}
            value={getValues(name)}
            disabled={disabled ? disabled : chechDisabled}
            readOnly = {disabled ? disabled : chechDisabled}
            onChange={(e) => {
              if (inFunc) {
                inFunc({ values: values, value: e.target.value, dispatch });
              } else {
                handleChange({ [name]: e.target.value });
              }
            }}
          >
              <option value={""}></option>
            {alloptions && alloptions[options]?.map(item => <option value={item?.id} key={item?.id} >{item?.name}</option> )}
          </select>
        </div>
      );
      break;
      
    case MULTIPLE_SELECT:
      input = (
        <div id={name}>
          <Select
            name={name}
            autoComplete="off"
            className="label-input"
            options={[...alloptions[options] ?? []]}
            placeholder={<>Tanlang</>}
            isSearchable
            // required={required}
            styles={{control: provided => ({ ...provided, minHeight: '38px !important',  height:"auto",})}}
            value={getValues(name)}
            isDisabled={disabled ? disabled : chechDisabled}
            isMulti
            onChange={(e) => handleChange({ [name]: [ ...e ]})}
          />
        </div>
      );
      break;      

    case STRING:
      input = (
        <div>
          <input
            type="text"
            className="label-input"
            name={name}
            // required={required}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            style={{ height:"38px !important"}}
            id={name}
            autoComplete="off"
            readOnly = {disabled ? disabled : chechDisabled}
            value={getValues(name)}
            onChange={(e) => handleChange({ [name]: e.target.value }) }
          />
        </div>
      );
      break;

    case PHONE:
      input = (
        <div id={name} style={{ display: "flex" }}>
          <NumberFormat
            name={name}
            id={name}
            // required={required}
            // readOnly={readOnly}
            readOnly = {disabled ? disabled : chechDisabled}
            minLength="14"
            autoComplete="off"
            format={"998 ## ### ## ##"}
            className="label-input"
            style={{ height:"38px !important"}}
            mask="_"
            value={getValues(name)}
            allowEmptyFormatting
            onValueChange={(e) => handleChange({ [name]: e.value })}
          />
        </div>
      );
    break;

    case NUMBER:

        input = (
          <div>
            <NumberFormat
              name={name}
              id={name}
              className="label-input"
              style={{ height:"38px !important"}}
              autoComplete="off"
              value={getValues(name) || ""}
              thousandSeparator={" "}
              // required={required}
              // readOnly={readOnly}
              minLength={minLength}
              maxLength={maxLength}
              readOnly = {disabled ? disabled : chechDisabled}
              onValueChange={(e) => handleChange({ [name]: e.value }) }
            />
          </div>
        );
        break;  

    case DATE:
      const handleOpenDateinput = () => (disabled ? disabled : chechDisabled) ? "" : setIsOpenDate(true)

      input = (
        <div id={name}>
          {/* <input
            type="date"
            className="label-input"
            style={{ height:"38px !important"}}
            value={getValues(name)}
            name={name}
            id={name}
            min="1950"
            autoComplete="off"
            max={new Date()?.toISOString()?.split('T')[0]}
            disabled={disabled ? disabled : chechDisabled}
            onChange={(e) => handleChange({ [name]: e.target.value }) }
            // readOnly={disabled ? disabled : chechDisabled}
            // required={required}
          /> */}
          <div className="label-input date-input" onClick={handleOpenDateinput}>
            <DateInput 
              value={getValues(name)} 
              name={name} 
              onChange={handleChange} 
              isOpenDate={isOpenDate} 
              setIsOpenDate={setIsOpenDate}
            />
              <>{getValues(name)}</>
          </div>
        </div>
      );
      break;

    case UPLOAD_IMAGE:
      const disabledUpload = observeValue?.dependent_name && getValues(observeValue?.dependent_name) === observeValue?.dependent_value ? true : false;
      input = (
        <div id={name}>
          {/* <UpLoadImage
            name={name}
            values={values}
            setHandleChange={handleChange}
            getValues={getValues}
            innerModal={innerModal}
            height={height}
            actionUrl={actionUrl}
            deletImage={deletImage}
            observeValue={disabledUpload }
            setSaveLoading={setSaveLoading}
          /> */}
          <HtmlUploader
            name={name}
            values={values}
            setHandleChange={handleChange}
            getValues={getValues}
            height={height}
            actionUrl={actionUrl}
            deletImage={deletImage}
            observeValue={disabledUpload }
            setSaveLoading={setSaveLoading}
            loading={saveLoading}
            labelName={labelName}
          />
        </div>
      );
      break; 
      
    case TEXTAREA:
      input = (
        <div>
          <textarea
            className="label-input textArea"
            name={name}
            id={name}
            autoComplete="off"
            // readOnly={readOnly}
            rows={rows}
            // required={required}
            placeholder={placeholder}
            readOnly = {disabled ? disabled : chechDisabled}
            value={getValues(name)}
            onChange={(e) => handleChange({ [name]: e.target.value })}
          />
        </div>
      );
      break;   
       
    case WTABLE:
        const handleAddRow = () => {
          if (values[name]) {
            const newRow = { ...WTable?.newRow, uuid: uuid(), id:null };
            handleChange({ [name]: [...values[name], newRow,] });
          } else {
            handleChange({ [name]: [{ ...WTable?.newRow, uuid: uuid(), id:null }] });
          }
        };
  

        input = (
            <div className="form_table" style={{ height: WTable?.height ? WTable?.height : "100%", border: "var(--primary) 2px solid", position: "relative", borderRadius: "3px", backgroundColor:"#FFF", marginTop:"8px" }} >
              {WTable?.newRow ? <button ref={WTable?.tour?.isTour === "ref1" ? ref1 : null} disabled={chechDisabled} onClick={handleAddRow} type="button" className="add__row_table"> + </button> : null}
              <div style={{ overflow: "auto" }} className="wTable__wrapper">
                <MainWTable
                  name={name}
                  ref2={ref2}
                  columnsData={WTable?.columns}
                  values={values}
                  height={WTable?.height}
                  totalWith={WTable?.totalWith}
                  id={name}
                />
              </div>
            </div>
        );
        break;      
  
    case WTABLE_CHILDREN_CONECT_MARTIAL_STATUS:
      const handleAddRowChildren = () => {
        if (values?.martial_status === "Турмуш_курмаган") {
          return
        }
        if (values[name]) {
          const newRow = { ...WTable?.newRow, uuid: uuid(), id:null };
          handleChange({ [name]: [...values[name], newRow,] });
        } else {
          handleChange({ [name]: [{ ...WTable?.newRow, uuid: uuid(), id:null }] });
        }
      };


      input = (
          <div className="form_table" style={{ height: WTable?.height ? WTable?.height : "100%", border: "var(--primary) 2px solid", position: "relative", borderRadius: "3px", backgroundColor:"#FFF", marginTop:"8px" }} >
            {WTable?.newRow ? <button ref={WTable?.tour?.isTour === "ref1" ? ref1 : null} disabled={chechDisabled} onClick={handleAddRowChildren} type="button" className="add__row_table"> + </button> : null}
            <div style={{ overflow: "auto" }} className="wTable__wrapper">
              <MainWTable
                name={name}
                ref2={ref2}
                columnsData={WTable?.columns}
                values={values}
                height={WTable?.height}
                totalWith={WTable?.totalWith}
                id={name}
              />
            </div>
          </div>
      );
      break;      
    
    case DEPENDENT_ON_ANOTHER_STRING:
      const isTrused = observeValue?.dependent_value === getValues(observeValue?.dependent_name)

      input = (
        <div>
          <input
            name={name}
            className="label-input"
            style={{height:"38px !important"}}
            id={name}
            autoComplete="off"
            value={isTrused ? "" : getValues(name)}
            disabled={isTrused ? isTrused : chechDisabled}
            onChange={(e) => handleChange({ [name]: e.target.value })}
            // required={isTrused ? false : required}
            // readOnly={isTrused ? isTrused : chechDisabled}
          />
        </div>
      );
    break;  

    case DEPENDENT_ON_ANOTHER_SELECT:
      const isDisabled = observeValue?.dependent_value === getValues(observeValue?.dependent_name)

        input = (
          <div style={{ display: "flex"}}>
            <select
              name={name}
              id={name}
              className="label-input"
              autoComplete="off"
              style={{height:"38px !important"}}
              // required={isDisabled ? false : required}
              value={isDisabled ? "" : getValues(name)}
              disabled={isDisabled ? isDisabled : chechDisabled }
              onChange={(e) => handleChange({ [name]: e.target.value }) }
            >
              <option value={""} ></option>
              {alloptions && alloptions[options]?.map(item => <option value={item?.id} key={item?.name} >{item?.name}</option> )}
            </select>
          </div>
        );
      break;    
  
    case WOMAN_GENDER_CHECK_MULTIPLE_SELECT:
      const fgnQ_pos = [
        { label: "Оператор", value: "Оператор", id: 11 },
        { label: "Сотувчи", value: "Сотувчи", id: 1 },
        { label: "Фаррош", value: "Фаррош", id: 8 },
        { label: "Бухгалтерия", value: "Бухгалтерия", id: 12 },
        { label: "Ошпаз", value: "Ошпаз", id: 9 },
        // { label: "Ингилиз тили", value: "Ингилиз тили", id: 16 },
        // { label: "Мобилограф ", value: "Мобилограф", id: 17 },
        // { label: "SMM", value: "SMM", id: 18 },
        // { label: "Aктёр ва актриса", value: "Aктёр ва актриса", id: 19 },
      ]
      const othQ_pos = [
        { label: "Сотувчи", value: "Сотувчи", id: 1 },
        { label: "Фаррош", value: "Фаррош", id: 8 },
        { label: "Ошпаз", value: "Ошпаз", id: 9 },
      ]   
      const all_pos = [...alloptions[options] ?? []]

      const opstch = () => {
        // farg'ona filiali uchun
        if (values?.branch_id === "1") {
          if (values?.gender === "2") {
            // farg'ona qizlar uchun
            return fgnQ_pos
          } else {
            // faqat fargona ko'rinish uchun
            return all_pos
          }
        } else {
          // boshqa filialdagi qizlar uchun
           if (values?.gender === "2") {
            return othQ_pos
           } else{
            // boshqa filiallarda shu id-li lavozimlar ko'rinmasligi uchun
            const excludedIds = [16, 17, 18, 19];         
            const clear_ing_la = all_pos?.filter(p => !excludedIds.includes(Number(p.id)));

            return clear_ing_la
          }
        }


      }

      input = (
        <div id={name}>
          <Select
            name={name}
            autoComplete="off"
            className="label-input"
            options={opstch()}
            placeholder={<>Tanlang</>}
            isSearchable
            // required={required}
            styles={{control: provided => ({ ...provided, minHeight: '38px !important', height:"auto"})}}
            value={getValues(name)}
            isDisabled={disabled ? disabled : chechDisabled}
            isMulti
            onChange={(e) => handleChange({ [name]: [ ...e ]})}
          />
        </div>
      );
      break;   
      
    default:   
      break;
  }

  return input;
};

export default memo(Inputs);

