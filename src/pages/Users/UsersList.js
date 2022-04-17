import React, { useEffect, useState } from "react";
import {
  useDispatch, connect, useSelector
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label, Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  fetchUsers, deleteUsers, fetchUsersRoles,
} from "store/users/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import UsersAddModal from "./UsersAddModal";

function UsersList(props) {

  const [selectedUser, setSelectedUser] = useState();
  const [btnprimary1, setBtnprimary1] = useState(false);

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
    deleteClearingCounter,
    roles,
    clearingCounter,
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
    roles: state.usersReducer.rolesData,
    clearingCounter: state.usersReducer.clearingCounter,
  }));

  const columns = [
    {
      text: "createdAt",
      dataField: "createdAt",
      sort: true,
      formatter: (user) => { return new Date(user.createdAt).toDateString() },
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
      text: "RoleId",
      dataField: "roleId.title",
      sort: true,
      formatter: (user) => (
        <>
          {/* {console.log("ghgfffffffffffffffffffffffffff")}
          {console.log(user)} */}
          {user.roleId ? (
            <div className="d-flex gap-3">
              <Label className="me-1" htmlFor={user.id} data-on-label="Active" data-off-label="">{user.roleId.title}</Label>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Label className="me-1" htmlFor={user.id} data-on-label="Active" data-off-label=""> </Label>
            </div>
          )}
        </>

      ),
    },
    {
      dataField: "isActive",
      text: "status",
      sort: true,
      formatter: (user) => (
        <div className="d-flex gap-3">
          <Input type="checkbox" id={user.id} switch="none" defaultChecked={user.isActive} onClick={() => { }} />
          <Label className="me-1" htmlFor={user.id} data-on-label="Active" data-off-label=""></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => { }}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => { }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  const [sizePerPage, setSizePerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUsers(1, sizePerPage);
    loadRoles(1, 100);
  }, [sizePerPage, 1, clearingCounter]);

  const loadUsers = (page, limit) => {
    dispatch(fetchUsers({
      page,
      limit,
    }));

  };
  const loadRoles = (page, limit) => {
    dispatch(fetchUsersRoles({
      page,
      limit,
    }));

  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Users</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle> </CardTitle>
                  <UsersAddModal usersRoles={roles} />
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
                          {loading && <TableLoader colSpan={4} />}
                          {!loading && docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                          {/* {console.log(docs)} */}
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
                        setSizePerPage={setSizePerPage}
                        onChange={loadUsers}
                      />
                      {/* <Dropdown
                        isOpen={btnprimary1}
                        toggle={() => setBtnprimary1(!btnprimary1)}
                      >
                        <DropdownToggle tag="button" className="btn btn-secondary ">
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>10</DropdownItem>
                          <DropdownItem>20</DropdownItem>
                          <DropdownItem>30</DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
export default UsersList;
