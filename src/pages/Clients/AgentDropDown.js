import {  connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Select from "react-select";
function AgentForm(props){

  const [addModal, setAddUserModal] = useState(false);
  const { create } = props.clientPermissions;
  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
 
  const columns = [
    
    {
      dataField: "firstName",
      text: props.t("Client First Name"),
     
    },
    {
      dataField: "lastName",
      text: props.t("Client Last Name")
    },
  ];
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
  return (
    <React.Fragment >
      <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`}  onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> {props.t("Assign Sales Agent")}</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true} size = "lg">
        <ModalHeader toggle={toggleAddModal} tag="h4" >
          {props.t("Assign Sales Agent")}
        </ModalHeader>
        <ModalBody >
          <div className="table-rep-plugin">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <Table
                id="tech-companies-1"
                className="table "
              >
                <Thead className="text-center" >
                  <Tr>
                    {columns.map((column, index) =>
                      <Th data-priority={index} key={index}>{column.text}</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody className="text-center" style={{ 
                  fontSize: "13px",
               
                }}>
              
                  {props.clients.map((row, rowIndex) =>
                    <Tr key={rowIndex} >
                      {columns.map((column, index) =>
                        <Td key={`${rowIndex}-${index}`}>
                     
                          {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                        </Td>
                      )}
                    </Tr>
                  )}
                </Tbody>
              </Table>
          
            </div>
          </div>
          <Row>
            <Col>
              <label>Select A Sales Agent</label>
              <Select  
                classNamePrefix="select2-selection"
                placeHolder={"sales agent"}
                options= {usersOptions}
            
            
              />
            </Col>
           
          </Row> 
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  error: state.clientReducer.error,
  clientPermissions: state.Profile.clientPermissions,
  docs: state.usersReducer.docs || []

});
export default connect(mapStateToProps, null)(withTranslation()(AgentForm));