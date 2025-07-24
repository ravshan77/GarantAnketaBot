import React, { memo } from "react";
import { Delete } from "../../assets";

const TableHeader = ({ columnsData }) => {

  return (
    <thead  >
      {columnsData?.map((row, i) => (
        <tr key={i} >
          {row?.map(col => (
            <th
              colSpan={col?.colSpan}
              rowSpan={col?.rowSpan}
              style={{ fontWeight: "bold", ...col?.style,}}
              key={"Table_th" + col?.title}
            >
              {!col?.delete ? col?.title : <div className="delete_icon"> <Delete /> </div>}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default memo(TableHeader);
