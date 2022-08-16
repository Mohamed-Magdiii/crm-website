import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  
} from "reactstrap";
import { editClientDetails } from "store/client/actions";
function PortalAccess(props){
  const [open, setOpen] = useState(false);
  const clientDetails = props.clientDetails;
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const toggleModal = ()=>{
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <button 
        type="button" 
        className="btn btn-primary waves-effect waves-light w-100 me-1"
        onClick={toggleModal}
      >
        Portal Access
      </button>
      {/* <Link to="#" className="btn btn-primary" onClick={toggleModal}>
        <i className="bx me-1"> Portal Access</i>
      </Link> */}
      <Modal isOpen={open} toggle={toggleModal} >
        <ModalHeader toggle={toggleModal}>
             Portal Access
        </ModalHeader>
        <ModalBody>
          <div className="d-flex gap-3 d-flex flex-column align-items-center">
            
            <h3>{clientDetails?.isActive ? "Client is active" : "Client is not active"}</h3>
            <Input type="checkbox" id={props.clientDetails?._id} switch="none" checked={clientDetails?.isActive  ? true : false} onChange={()=>dispatch(editClientDetails({
              values:{ isActive:clientDetails?.isActive ? false : true },
              id:clientId
            }))} />
            <Label className="me-1" htmlFor={props.clientDetails?._id} data-on-label="" data-off-label=""></Label>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
   
  );

}

export default PortalAccess;