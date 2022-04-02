import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

const UserProfile = props => {
  const dispatch = useDispatch()

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username)
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  function handleValidSubmit(event, values) {
    dispatch(editProfile(values))
  }

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
                      <svg style={{ width: "25px", marginTop: "25px", height: "25px" }} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </div>

                    <div className="d-flex justify-content-around">
                      <div className="  flex-column">
                        <div class="card-header">
                          <div class="card-title">
                            <h4>First Name</h4>

                          </div>
                          <div class="card-subtitle">
                            fristName
                          </div>
                        </div>
                        <div class="card-header">
                          <div class="card-title">
                            <h4> Last Name</h4>

                          </div>
                          <div class="card-subtitle">
                            lastName
                          </div>
                        </div>
                      </div>
                      <div className="  flex-column">
                        <div class="card-header">
                          <div class="card-title">
                            <h4>E-Mail</h4>

                          </div>
                          <div class="card-subtitle">
                            email
                          </div>
                        </div>
                        <div class="card-header">
                          <div class="card-title">
                            <h4>Password</h4>

                          </div>
                          <div class="card-subtitle">
                            {/* {new Array(passwordLength).join('*')} */}
                            ***********
                          </div>
                        </div>
                      </div>
                      <div className="  flex-column">
                        <div class="card-header">
                          <div class="card-title">
                            <h4>Mobile</h4>

                          </div>
                          <div class="card-subtitle">
                            mobile
                          </div>
                        </div>
                        <div class="card-header">
                          <div class="card-title">
                            <h4>Phone</h4>

                          </div>
                          <div class="card-subtitle">
                            phone
                          </div>
                        </div>
                      </div> 
                    </div>  
                  </div>
                </CardBody>
              </Card>  
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <AvField
                    name="username"
                    label="User Name"
                    value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
