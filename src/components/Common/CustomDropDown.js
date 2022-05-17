import React, { useState } from "react";
import { 
  Dropdown, DropdownToggle, DropdownItem, DropdownMenu
} from "reactstrap";

function CustomDropdown({ id, status, approve, reject }){
  const [isOpen, setIsOpen] = useState(false);

  const isDisabled = ()=>{
    if (status === "APPROVED"){
      return true;
    }
    else if (status === "REJECTED"){
      return true;
    }
    else {
      return false;
    }
  };
  return (
    <div className="d-flex gap-3" >
      <div className="flex-shrink-0">
        <Dropdown disabled={isDisabled()}
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          className="chat-noti-dropdown"
        >
          <DropdownToggle tag="i" className="text-muted">
            <i className="mdi mdi-dots-horizontal font-size-18"></i>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem onClick={()=>approve(id)}href="#">Approve</DropdownItem>
            <DropdownItem onClick={()=>reject(id)} href="#">Reject</DropdownItem>
                
          </DropdownMenu>
        </Dropdown>
      </div>
          
    </div>
  );
}
export default CustomDropdown;