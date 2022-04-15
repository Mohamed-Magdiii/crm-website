
import React from "react";

import Loader from "./Loader";

import {
  Tr, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function TableLoader({ colSpan = 1 }){
  return (<Tr>
    <Td colSpan={colSpan} className="text-center">
      <Loader />
    </Td>
  </Tr>);
}
export default TableLoader;