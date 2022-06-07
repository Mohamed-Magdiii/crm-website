import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label,
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { fetchRoles, deleteRoles } from "store/roles/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import RolesAdd from "./RolesAdd";
import RolesEdit from "./RolesEdit";
function RolesList(props){
  
  const [editModal, setEditUserModal] = useState(false);
  const [deleteModal, setDeleteUserModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const { update, delete:deleteRolePermission }  = props.rolesPermissions;
  const columns = [
    {
      dataField: "createdAt",
      text: "Created Date",
      formatter: (val) => {return new Date(val.createdAt).toDateString()}
    }, 
    {
      dataField:"title",
      text:"Title"
    },
    {
      dataField: "createdBy",
      text: "Created By",
      formatter: (val) => {return (val.createdBy && val.createdBy.firstName) ? `${val.createdBy.firstName} ${val.createdBy.lastName}` : ""},
    },
    {
      dataField: "isActive",
      text: "Status",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input type="checkbox" id={item.id} switch="none" defaultChecked={item.isActive} onClick={() => {}} />
          <Label className="me-1" htmlFor={item.id} data-on-label="Active" data-off-label=""></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className={`mdi mdi-pencil font-size-18 ${!update ? "d-none" : ""}`}
              id="edittooltip"
              onClick={() => {setSelectedRole(item); setEditUserModal(true)}}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className={`mdi mdi-delete font-size-18 ${!deleteRolePermission ? "d-none" : ""}`}
              id="deletetooltip"
              onClick={() => { setSelectedRole(item); setDeleteUserModal(true)}}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  const [sizePerPage, setSizePerPage] = useState(5);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    loadRoles(1, sizePerPage);
  }, [sizePerPage, 1]);

  const loadRoles = (page, limit) => {
    dispatch(fetchRoles({
      page,
      limit,
    }));
  };

  const deleteRole = () => {
    dispatch(deleteRoles(selectedRole._id));
  };

  useEffect(()=>{
    if (props.deleteClearingCounter > 0 && deleteModal) {
      setDeleteUserModal(false);
    }
  }, [props.deleteClearingCounter]);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Roles</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Roles List ({props.totalDocs})</CardTitle>
                  <RolesAdd />
                </CardHeader>
                <CardBody>
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table "
                      >
                        <Thead>
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadRoles}
                      />
                    </div>
                  </div>


                </CardBody>
              </Card>
            </Col>
          </Row>
          {<RolesEdit open={editModal}  role={selectedRole} onClose={()=>{setEditUserModal(false)}} />}
          {<DeleteModal loading={props.deleteLoading} onDeleteClick={deleteRole} show={deleteModal } onCloseClick={()=>{setDeleteUserModal(false)}} />}
        </div>
      </div>
    </React.Fragment>
  );
}
// export default RolesList


const mapStateToProps = (state) => ({
  loading: state.rolesReducer.loading || false,
  docs: state.rolesReducer.docs || [],
  page: state.rolesReducer.page || 1,
  totalDocs: state.rolesReducer.totalDocs || 0,
  totalPages: state.rolesReducer.totalPages || 0,
  hasNextPage: state.rolesReducer.hasNextPage,
  hasPrevPage: state.rolesReducer.hasPrevPage,
  limit: state.rolesReducer.limit,
  nextPage: state.rolesReducer.nextPage,
  pagingCounter: state.rolesReducer.pagingCounter,
  prevPage: state.rolesReducer.prevPage,
  deleteLoading: state.rolesReducer.deleteLoading,
  deleteClearingCounter: state.rolesReducer.deleteClearingCounter,
  rolesPermissions: state.Profile.rolesPermissions || {}

});
export default connect(mapStateToProps, null)(RolesList);
