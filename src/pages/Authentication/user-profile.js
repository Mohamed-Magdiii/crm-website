import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

import { del, get, post, put, redirectToLogin } from "../../apis/api_helper";
import * as url from "../../apis/url_helper";

const UserProfile = (props) => {
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  const [fristName, setfristName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [roleId, setroleId] = useState("");
  const [idx, setidx] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getProfileData = get(url.PROFILE);
    
    getProfileData.then((userData) => {
      if (userData.status) {
        if (userData.result != null) {
          setfristName(userData.result.firstName);
          setlastName(userData.result.lastName);
          setemail(userData.result.email);
          setroleId(userData.result.roleId.title);
          setidx(userData.result._id);
        }

      }
    }).catch(err => { redirectToLogin() })



  }, [dispatch, success]);


  // function handleValidSubmit(event, values) {
  //   dispatch(editProfile(values));
  // }

  // toggle modal
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Minia - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minia" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="  flex-column">
                    <div className="d-flex justify-content-between">
                      <div className="ms-3 ">
                        <img
                          src={avatar}
                          alt=""
                          className="img-thumbnail rounded-circle img-thumbnail"
                        />
                      </div>
                      <svg
                        onClick={toggle}
                        style={{
                          width: "25px",
                          marginTop: "25px",
                          height: "25px",
                        }}
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                      </svg>
                    </div>

                    <div className="d-flex justify-content-around">
                      <div className="  flex-column">
                        <div className="card-header">
                          <div className="card-title">
                            <h4>First Name</h4>
                          </div>
                          <div className="card-subtitle">{fristName}</div>
                        </div>
                        <div className="card-header">
                          <div className="card-title">
                            <h4>E-Mail</h4>
                          </div>
                          <div className="card-subtitle">{email}</div>
                        </div>
                      </div>
                      <div className="  flex-column">
                        <div className="card-header">
                          <div className="card-title">
                            <h4> Last Name</h4>
                          </div>
                          <div className="card-subtitle">{lastName}</div>
                        </div>
                        <div className="card-header">
                          <div className="card-title">
                            <h4>Role</h4>
                          </div>
                          <div className="card-subtitle">{roleId}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              {/* ************ modal Edit User form*************** */}

              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} tag="h4">
                  Edit Profile
                  {/* {!!isEdit ? "Edit User" : "Add User"} */}
                </ModalHeader>
                <ModalBody>
                  <AvForm
                  // onValidSubmit={handleValidUserSubmit}
                  >
                    <Row form>
                      <Col xs={12}>
                        <div className="mb-3">
                          <AvField
                            name="fristname"
                            label="Frist Name"
                            type="text"
                            errorMessage="Invalid name"
                            validate={{
                              required: { value: true },
                            }}
                            value={fristName || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="lastname"
                            label="Last Name"
                            type="text"
                            errorMessage="Invalid lastname"
                            validate={{
                              required: { value: true },
                            }}
                            value={lastName || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="role"
                            label="Role"
                            type="text"
                            errorMessage="Invalid lastname"
                            validate={{
                              required: { value: true },
                            }}
                            value={roleId || ""}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="currentPassword"
                            label="Current password"
                            type="password"
                            errorMessage="Invalid password"
                            validate={{
                              required: { value: true },
                            }}
                            value={""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="newPassword"
                            label="New Password"
                            type="password"
                            errorMessage="Invalid"
                            validate={{
                              required: { value: true },
                            }}
                            value={""}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-success save-user"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
