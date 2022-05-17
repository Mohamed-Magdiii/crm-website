import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody, 
} from "reactstrap"; 
import { Link, withRouter } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
 
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
 
import {
  redirectToLogin
} from "../../../apis/api_helper";
import { getProfileData } from "../../../apis/auth";
import EditProfileData from "./EditProfileData";
import EditProfilePassword from "./EditProfilePassword";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { error, success, clearingCounter } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
    clearingCounter: state.usersReducer.clearingCounter,
  }));

  const [fristName, setfristName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [roleId, setroleId] = useState(""); 
  const [modal, setModal] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [userData, setuserData] = useState({});

  useEffect(() => {
    getProfileData()
      .then((userData) => {
        if (userData.status) {
          if (userData.result != null) {
            setuserData(userData.result);
            setfristName(userData.result?.firstName);
            setlastName(userData.result?.lastName);
            setemail(userData.result?.email);
            setPhone(userData.result?.phone);
            setMobile(userData.result?.mobile);
            setroleId(userData.result?.roleId?.title); 
          }
        }
      })
      .catch(() => {
        redirectToLogin();
      });
  }, [dispatch, success, clearingCounter]);


  // function handleValidSubmit(event, values) {
  //   dispatch(editProfile(values));
  // }

  // toggle modal
  const toggle = () => {
    setModal(!modal);
  };
  const togglePass = () => {
    setModalPass(!modalPass);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Minia - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Profile" breadcrumbItem="Profile" />
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="  flex-column">
                    <div className="d-flex pull-right">
                      <Link className="text-success"
                        to="#"
                        style={{
                          marginRight: "25px",
                        }}
                      >
                        <i
                          className="mdi mdi-key-variant font-size-18"
                          id="edittooltip"
                          onClick={togglePass}
                        >
                        </i>
                      </Link>
                      <Link className="text-success" to="#">
                        <i
                          className="mdi mdi-pencil font-size-18"
                          id="editt"
                          onClick={toggle}
                        >
                        </i>
                      </Link>
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
                            <h4> Phone</h4>
                          </div>
                          <div className="card-subtitle">{phone}</div>
                        </div>
                      </div>
                      <div className="  flex-column">
                        <div className="card-header">
                          <div className="card-title">
                            <h4>Role</h4>
                          </div>
                          <div className="card-subtitle">{roleId}</div>
                        </div>
                        <div className="card-header">
                          <div className="card-title">
                            <h4>Mobile</h4>
                          </div>
                          <div className="card-subtitle">{mobile}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              {/* ************ modal Edit User form*************** */}
              {<EditProfileData open={modal} user={userData} onClose={() => { toggle() }} />}
              {<EditProfilePassword openPass={modalPass} userPass={userData} onClosePass={() => { togglePass() }} />}

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
