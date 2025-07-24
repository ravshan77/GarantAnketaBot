import React, { memo } from "react";
import TableInput from "./TableInput";
import { useDispatch } from "react-redux"
import { DELETE } from "../../server/method";
import { message } from "antd"
import { setValues } from "../../redux";


const WTableBody = (prop) => {
  const dispatch = useDispatch();
  const columnsData = prop?.columnsData;
  const name = prop?.name;
  const option = prop?.option;
  const values = prop?.values;
  const handleDeleteCallback = prop?.handleDelete;
  const ref2 = prop?.ref2;

  [{}, {}]
  [{}]

  const handleDelete = async (id, item, col) => {
    if(handleDeleteCallback){
      handleDeleteCallback(id, item, col);
    }else{
      if (item?.uuid) {
        dispatch(setValues({ ...values, [name]: values[name]?.filter((obj) => obj?.uuid !== item?.uuid) }))
      } else {
        if(col?.delete_url && id){
         await DELETE(col?.delete_url + id).then((res) =>{
            if (res.status === 200) {
              dispatch(setValues({ ...values, [name]: values[name]?.filter((obj) => obj?.id !== id) }));
              message.success("Malumot o'chirildi")
            }
          })
        }else{
          dispatch(setValues({ ...values, [name]: values[name]?.filter((obj) => obj?.id !== id) }));
        }
      }  
    }
  }


  const onChangeInput = (newItem) => {
    const newValue = values[name]?.map((item) => {
      if (item?.uuid) {
        return item?.uuid === newItem?.uuid ? { ...newItem } : item;
      } else if (item?.id) {
        return item?.id === newItem?.id ? { ...newItem } : item;
      }else{
       return item
      }
    });
    dispatch(setValues({ ...values, [name]: newValue }))
  }

  const reverceArray = values[name] || [];
  

  return (
    <tbody style={{ overflow: "auto" }} key={"WTBody"}>
      {values &&
        reverceArray?.map((item, index) =>
          columnsData?.map((row, i) => (
            <TableInput
              item={item}
              key={index+ i + "key"}
              row={row}
              index={index}
              option={option}
              name={name}
              values={values}
              deleteItem={handleDelete}
              onChangeInput={onChangeInput}
              ref2={ref2}
            />
          ))
        )}
    </tbody>
  );
};

export default memo(WTableBody);
