import React, { useState } from 'react';
import {
    Card,
    Col,
    Container,
    Row,
    Label,
    CardBody,
    Button
} from "reactstrap"
import Select from "react-select" 
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import MetaTags from "react-meta-tags"




const AddUser = () => {
 
    return (
        <React.Fragment>

            <div className="page-content">
                <MetaTags>
                    <title>Users List</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Contacts" breadcrumbItem="Add User" />
                    <Row>
                        <Col  >
                            <Card>
                                <CardBody>
                                    {/* <CardTitle>Validation type</CardTitle> */}
                                    <AvForm 
                                    className='p-4'              
                                      >
                                        <div className="mb-3">
                                            <AvField
                                                name="fristname"
                                                label="Frist Name  "
                                                placeholder="Frist Name"
                                                type="text"
                                                errorMessage="Enter Frist Name"
                                                validate={{ required: { value: true } }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <AvField
                                                name="lastname"
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
                                                options={[
                                                    { label: "Admin", value: "Admin" },
                                                    { label: "Client", value: "Client" }
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
                                </CardBody>
                            </Card>
                        </Col> 
                    </Row> 
                </Container>
            </div>
        </React.Fragment>
    );
}

export default AddUser;