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
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from "reactstrap"

import Select from "react-select"

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator"


import { AvForm, AvField } from "availity-reactstrap-validation";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import { del, patch, get, post, put } from "../../helpers/api_helper";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  getUsers as onGetUsers,
} from "../../store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

const UsersList = props => {
  const dispatch = useDispatch()

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedGroup, setselectedGroup] = useState(null)
  const [addModal, setAddUserModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  const [update, setUpdate] = useState(false);

  // toggle modal
  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
  // toggle Edit modal
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };
  const handleSelectGroup = (selectedGroup) => {
    console.log(selectedGroup);
    setselectedGroup(selectedGroup.value)
  }



  console.log(users);
  const { SearchBar } = Search



  useEffect(() => {
    const getProfileData = get("/api/v1/crm/users");
    getProfileData.then((usersData) => {
      setUsers(usersData.result)
      // console.log(usersData);
    })

    const getRoles = get("/api/v1/crm/roles");
    getRoles.then((rolesData) => {
      setRoles(rolesData.result)
      // console.log(rolesData.result);
      // console.log(roles);
    })

  }, [update])


  // const getRoleById = (roleId) => {
  //   const getRole = get("/api/v1/crm/roles/"+roleId);
  //   getRole.then((roleData) => {
  //     // setRoles(roleData.result)
  //     // console.log(rolesData.result);
  //     console.log(roleData.result.title);
  //     return roleData.result.title
  //   }).catch(err=>{return null})

  // }
  const handleAddUser = (event, userData) => {
    userData = { ...userData, roleId: selectedGroup }
    console.log(userData);
    const addUser = post("api/v1/crm/users/", userData);
    addUser.then((response) => {
      console.log(response);
    })
    console.log("add user");
    setUpdate(!update)
    toggleAddModal()
  }

  const EditUser = (event, userData) => {
    delete userData.password
    userData = { ...userData, roleId: selectedGroup }
    console.log(userData);
    const editUser = patch("api/v1/crm/users/" + selectUser._id, userData);
    editUser.then((response) => {
      console.log(response);
    })
    console.log("edit user");
    setUpdate(!update)
    toggleEditModal()
  }

  const handleDeleteUser = (user) => {
    console.log("delete user" + user._id);
  }

  const handleStatusUser = (user) => {
    console.log("status user" + user.isActive);
  }

  const handleEditUser = (user) => {

    let rol = { value: user.roleId }
    setSelectUser(user)

    toggleEditModal()
    handleSelectGroup(rol)
    console.log(user);
  }


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
                                      <Link to="#" className="btn btn-light" onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New</Link>
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
                                    keyField={"_id"}
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





          <Modal isOpen={addModal} toggle={toggleAddModal}>
            <ModalHeader toggle={toggleAddModal} tag="h4">
              Add New User
              {/* {!!isEdit ? "Edit User" : "Add User"} */}
            </ModalHeader>
            <ModalBody>
              <AvForm
                className='p-4'
                onValidSubmit={(e, v) => {
                  handleAddUser(e, v)
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="firstName"
                    label="Frist Name  "
                    placeholder="Frist Name"
                    type="text"
                    errorMessage="Enter Frist Name"
                    validate={{ required: { value: true } }}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="lastName"
                    label="Last Name  "
                    placeholder="Last Name"
                    type="text"
                    errorMessage="Enter Last Name"
                    validate={{ required: { value: true } }}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    placeholder="Enter Valid Email"
                    type="email"
                    errorMessage="Invalid Email"
                    validate={{
                      required: { value: true },
                      email: { value: true },
                    }}
                  />
                </div>
                <div className="mb-3">
                  <Label>Password</Label>
                  <AvField
                    name="password"
                    type="password"
                    placeholder="Password"
                    errorMessage="Enter password"
                    validate={{ required: { value: true } }}
                  />
                </div>
                <div className="mb-3">
                  <label >Role</label>
                  <Select
                    value={selectedGroup}
                    onChange={(selected) => {
                      handleSelectGroup(selected)
                    }}
                    options={[
                      { label: "Admin", value: "624ec3f8a32d3c13fcedcdb8" },
                      { label: "Client", value: "624f50c9cd61366cafe75e0d" }
                    ]}
                    classNamePrefix="select2-selection"
                  />
                </div>
                <div className='text-center p-5'>
                  <Button type="submit" color="primary" className="">
                    Add New User
                  </Button>
                </div>
              </AvForm>
            </ModalBody>
          </Modal>





          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal} tag="h4">
              Edit User
            </ModalHeader>
            <ModalBody>
              <AvForm
                className='p-4'
                onValidSubmit={(e, v) => {
                  EditUser(e, v)
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="firstName"
                    label="Frist Name  "
                    placeholder="Frist Name"
                    type="text"
                    errorMessage="Enter Frist Name"
                    validate={{ required: { value: true } }}
                    value={selectUser.firstName || ""}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="lastName"
                    label="Last Name  "
                    placeholder="Last Name"
                    type="text"
                    errorMessage="Enter Last Name"
                    validate={{ required: { value: true } }}
                    value={selectUser.lastName || ""}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    placeholder="Enter Valid Email"
                    type="email"
                    errorMessage="Invalid Email"
                    validate={{
                      required: { value: true },
                      email: { value: true },
                    }}
                    value={selectUser.email || ""}
                  />
                </div>
                <div className="mb-3">
                  <Label>Password</Label>
                  <AvField
                    name="password"
                    type="password"
                    placeholder="Password"
                    errorMessage="Enter password"
                    validate={{ required: { value: true } }}
                    value={selectUser.password || ""}
                  />
                </div>
                <div className="mb-3">
                  <label >Role</label>
                  <Select
                    value={selectUser.roleId || ""}
                    onChange={(selected) => {
                      console.log("changedddddd");
                      handleSelectGroup(selected)
                    }}
                    options={[
                      { label: "Admin", value: "624ec3f8a32d3c13fcedcdb8" },
                      { label: "Client", value: "624f50c9cd61366cafe75e0d" }
                    ]}
                    classNamePrefix="select2-selection"
                  />
                </div>
                <div className='text-center p-5'>
                  <Button type="submit" color="primary" className="">
                    EditUser
                  </Button>
                </div>
              </AvForm>
            </ModalBody>
          </Modal>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UsersList)
