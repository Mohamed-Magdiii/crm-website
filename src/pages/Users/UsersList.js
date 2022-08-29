import React, { useEffect, useState } from "react";
import {
  useDispatch, useSelector
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  fetchUsers, deleteUsers, fetchUsersRoles, editUser,
} from "store/users/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import UsersAddModal from "./UsersAddModal";
import UsersEditModal from "./UsersEditModal";
import { showErrorNotification } from "store/notifications/actions";
function UsersList() {

  const [editModal, setEditUserModal] = useState(false);
  const [deleteModal, setDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const {
    loading,
    docs,
    page,
    totalDocs,
    totalPages,
    hasNextPage,
    hasPrevPage,
    limit,
    nextPage,
    pagingCounter,
    prevPage,
    deleteLoading,
    deleteClearingCounter,
    roles,
    clearingCounter,
    userPermissions
    // editClearingCounter,
  } = useSelector((state) => ({
    loading: state.usersReducer.loading || false,
    docs: state.usersReducer.docs || [],
    page: state.usersReducer.page || 1,
    totalDocs: state.usersReducer.totalDocs || 0,
    totalPages: state.usersReducer.totalPages || 0,
    hasNextPage: state.usersReducer.hasNextPage,
    hasPrevPage: state.usersReducer.hasPrevPage,
    limit: state.usersReducer.limit,
    nextPage: state.usersReducer.nextPage,
    pagingCounter: state.usersReducer.pagingCounter,
    prevPage: state.usersReducer.prevPage,
    deleteLoading: state.usersReducer.deleteLoading,
    deleteClearingCounter: state.usersReducer.deleteClearingCounter,
    roles: state.usersReducer.rolesData,
    clearingCounter: state.usersReducer.clearingCounter,
    // editClearingCounter: state.usersReducer.editClearingCounter,
    userPermissions: state.Profile.userPermissions || {}
  }));

  const { delete: deleteUserPermission, update } = userPermissions;
  const columns = [
    {
      text: "CreatedAt",
      dataField: "createdAt",
      sort: true,
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString()),
    },
    {
      text: "First Name",
      dataField: "firstName",
      sort: true,
    },
    {
      text: "Last Name",
      dataField: "lastName",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      text: "Role",
      dataField: "roleId.title",
      sort: true,
      formatter: (user) => (
        <>
          {user.roleId ? (
            <div className="  text-center">
              {user.roleId.title}
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Label className="me-1" data-on-label="roleId" data-off-label=""> </Label>
            </div>
          )}
        </>

      ),
    },
    {
      dataField: "isActive",
      text: "Status",
      sort: true,
      formatter: (user) => (
        <div className="text-center">
          <Input type="checkbox" id={user.id} switch="none" checked={user.isActive} onChange={() => { setSelectedUser(user); statusUser(user) }} />
          <Label className="me-1" htmlFor={user.id} data-on-label="" data-off-label=""></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (user) => (
        <div className="text-center">
          <Link className="text-success" to="#">
            <i
              className={`mdi mdi-pencil font-size-18 ${!update ? "d-none" : ""}`}
              id="edittooltip"
              onClick={() => { setSelectedUser(user); setEditUserModal(true) }}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className={`mdi mdi-delete font-size-18 ${!deleteUserPermission ? "d-none" : ""}`}
              id="deletetooltip"
              onClick={() => { setSelectedUser(user); setDeleteUserModal(true) }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  const [sizePerPage, setSizePerPage] = useState(10);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [currentPage, setcurrentPagePage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUsers(currentPage, sizePerPage);
    loadRoles(1, 100);
  }, [sizePerPage, 1, clearingCounter]);

  const loadUsers = (page, limit) => {
    setcurrentPagePage(page);
    if (SearchInputValue !== "") {
      dispatch(fetchUsers({
        page,
        limit,
        searchText: SearchInputValue,
      }));
    } else {
      dispatch(fetchUsers({
        page,
        limit,
      }));
    }
  };
  const numPageRows = (numOfRows) => {
    setSizePerPage(numOfRows);
  };
  const loadRoles = (page, limit) => {
    dispatch(fetchUsersRoles({
      page,
      limit,
    }));

  };
  const deleteUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("authUser"));
    if (selectedUser.email == currentUser.email){
      dispatch(showErrorNotification("Cannot delete same user as you logged in right now!"));
      setDeleteUserModal(false);
    } else
      dispatch(deleteUsers(selectedUser._id));
  };

  const statusUser = (user) => {
    const values = {
      "isActive": !user.isActive
    };
    dispatch(editUser({
      id: user._id,
      values
    }));

  };
  const searchHandelEnterClik = (event) => {
    if (event.keyCode === 13) {
      loadUsers(1, sizePerPage);
    }
  };
  useEffect(() => {
    if (deleteClearingCounter > 0 && deleteModal) {
      setDeleteUserModal(false);
    }
  }, [deleteClearingCounter]);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Users</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    Users List ({totalDocs})
                  </CardTitle>
                  <UsersAddModal usersRoles={roles} />
                </CardHeader>
                <CardBody>
                  <div className="search-box me-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <label htmlFor="search-bar-0" className="search-label">
                        <span id="search-bar-0-label" className="sr-only">Search this table</span>
                        <input onChange={(e) => setSearchInputValue(e.target.value)} onKeyDown={(e) => searchHandelEnterClik(e)} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control " placeholder="Search" />
                      </label>
                      <i onClick={() => loadUsers(1, sizePerPage)} className="bx bx-search-alt search-icon" /></div>
                  </div>
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table  table-hover "
                      >
                        <Thead className="text-center table-light" >
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody className="text-center" style={{ 
                          fontSize: "13px",
                           
                        }}>
                          {loading && <TableLoader colSpan={6} />}
                          {!loading && docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {/* {console.log(rowIndex)} */}
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                      <CustomPagination
                        totalPages={totalPages}
                        docs={docs}
                        sizePerPage={sizePerPage}
                        page={page}
                        totalDocs={totalDocs}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        limit={limit}
                        pagingCounter={pagingCounter}
                        setSizePerPage={numPageRows}
                        onChange={loadUsers}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<UsersEditModal open={editModal} user={selectedUser} usersRoles={roles} onClose={() => { setEditUserModal(false) }} />}
          {<DeleteModal loading={deleteLoading} onDeleteClick={deleteUser} show={deleteModal} onCloseClick={() => { setDeleteUserModal(false) }} />}
        </div>
      </div>
    </React.Fragment>
  );
}
export default UsersList;
