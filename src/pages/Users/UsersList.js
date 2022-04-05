import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
} from "reactstrap"

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  getUsers as onGetUsers,
} from "../../store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

const UsersList = props => {
  const dispatch = useDispatch()

  // const { users } = useSelector(state => ({
  //   users: state.contacts.users
  // }));  
  const { users } = require('../../common/data/contacts');
  
  console.log(users);
  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  }

  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "asc", // desc or asc
    },
  ]

  const contactListColumns = [
    {
      text: "ID",
      dataField: "id",
      sort: true,
      formatter: (cellContent, user) => <>{user.id}</>,
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
      dataField: "roleId",
      text: "RoleId",
      sort: true,
    },
    {
      dataField: "isActive",
      text: "status",
      sort: true,
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Input type="checkbox" id={user.id} switch="none" defaultChecked={user.isActive} onClick={() => handleStatusUser(user)} />
          <Label className="me-1" htmlFor={user.id} data-on-label="Active" data-off-label=""></Label>

        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleEditUser(user)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteUser(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
    }
  }, [dispatch, users])

  const handleAddUserClick = arg => {
    console.log("add user");
  }

  const handleDeleteUser = (user) => {
    console.log("delete user" + user.id);
  }

  const handleStatusUser = (user) => {
    console.log("status user" + user.isActive);
  }

  const handleEditUser = (user) => {
    console.log("edit user" + user.id);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users List</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="Users" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={users}
                        columns={contactListColumns}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">

                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon-search" />
                                    </div>
                                  </div></div>
                                <div className="col-md-6">
                                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                    <div>
                                      <Link to="/users/create" className="btn btn-light" onClick={handleAddUserClick}><i className="bx bx-plus me-1"></i> Add New</Link>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <Col sm="4">

                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="  mt-30">
                              <Col className="inner-custom-pagination d-flex w-100 ">
                                <div className="text-md-right  flex-grow-1 ">
                                  <div className="pagination pagination-rounded d-flex justify-content-center ">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
                                  </div>

                                </div>
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>

                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UsersList)
