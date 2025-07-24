import React ,{ memo } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import "./table.scss";
import { Empty } from "antd";


const Table = (prop) => {
  const columnsData = prop?.columnsData;
  const option = prop?.option;
  const values = prop?.values;
  const width = prop?.width;
  const totalWith = prop?.totalWith;
  const WTableWrapStyle = prop?.WTableWrapStyle;
  const name = prop?.name;
  const handleDelete = prop?.handleDelete;
  const ref2 = prop?.ref2;

  
  return (
    <div style={{  width: width ? width : "100%", display: "flex", flexDirection:"column", height:"100%"}}>
      <div style={{ overflow: "auto !important", width: "100%", ...WTableWrapStyle }} className="WTable_wrap">
        <table className="WTable_table" style={{ width: totalWith ? totalWith : "100%" }} key={"W"}>
          <TableHeader columnsData={columnsData} />
          {values[name]?.length !== 0 ? <TableBody
            name={name}
            columnsData={columnsData}
            values={values}
            handleDelete={handleDelete}
            option={option}
            ref2={ref2}
          /> : null}
        </table>
        {values[name]?.length === 0 ? <div className="empty__Wtable"> <Empty className="empty__icon" description={"Bo'sh"} /> </div> : null}
      </div>
    </div>
  );
};

export default memo(Table);
