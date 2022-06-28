import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import { assignAgentToClientStart } from "store/client/actions";
function AgentDropDown(props){
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(false);
  const { client } = props;
  const { _id : clientId } = client;
  const dispatch = useDispatch();
  const { agent } = client;
  const toggle = () => {
    if (selected){
      setMenu(false);
      setSelected(false);
    }
    else {

      setMenu(true);
    }
    
  };
  const assignAgent = (e)=>{
    setMenu(true);
    dispatch(assignAgentToClientStart({
      id:clientId,
      agent : {
        _id:e.value._id,
        firstName: e.value.firstName,
        lastName:e.value.lastName,
        email:e.value.email
      },
      values:{
        agent: e.value._id,
      }
    }));
    setSelected(true);
  };
  const filteredUsers = props.docs.filter(user=>user.roleId.title === "sales");
  const usersOptions = filteredUsers.map(user=>{
  
    return  {
      label :`${user.firstName} ${user.lastName}`,
      value: {
        _id:user._id,
        firstName: user.firstName,
        lastName:user.lastName,
        email:user.email
      }
    } ; 
  }  
  );
  return  (<Dropdown isOpen={menu} toggle = {(e)=>{toggle(e) }} className="d-inline-block">
    <DropdownToggle  onClick = {e=>e.stopPropagation()} className="btn header-item zero-height " tag="button">
      {agent ? `${agent.firstName} ${agent.lastName}` : "unassigned"}  
    </DropdownToggle>
    <DropdownMenu  onClick = {e=>e.stopPropagation()} className="dropdown-menu-end">
       
      <DropdownItem onClick={(e)=>{e.stopPropagation(); setMenu(true)}}
      >
        <Select  
          classNamePrefix="select2-selection"
          placeHolder={"sales agent"}
          options= {usersOptions}
          onChange = {(e)=>{assignAgent(e)}}
          closeMenuOnSelect={true}
        />

      </DropdownItem>
    </DropdownMenu>
  </Dropdown>);
   
}
const mapStateToProps = (state)=>({
  docs:state.usersReducer.docs || []
});
export default connect(mapStateToProps, null)(AgentDropDown);