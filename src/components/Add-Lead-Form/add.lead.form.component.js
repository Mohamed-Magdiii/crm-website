import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Button
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "./add.new.lead.styles.scss";
import { addNewLead, addNewLeadSuccess } from "../../store/leads/actions";
import CountryDropDown from "./country-dropdown.component";
import { apiError } from "store/actions";
function LeadForm(){
  const dispatch = useDispatch();
  const { error } = useSelector(state => ({
    error: state.leadReducer.error,
  }));
  const { successMessage } = useSelector(state=>({
    successMessage:state.leadReducer.successMessage
  }));
  const handleValidSubmit = (event, values)=>{
     
    event.preventDefault();
    dispatch(addNewLead(values));
    setTimeout(()=>{
      dispatch(addNewLeadSuccess(""));
      dispatch(apiError(""));
    }, 1000);
  }; 
  const hideForm = ()=>{
    
    document.getElementById("lead-modal").classList.add("hide-form");
    document.getElementById("lead-form").classList.add("hide-form");
  };
  return (
      
    <React.Fragment>
      <div onClick={hideForm} id="lead-modal" className="lead-modal"></div>
      <Col className="lead-form" id="lead-form" xl={6}>
        <Card>
          <CardHeader>
            
            <h4 className="card-title">Add New Lead</h4>
                
          </CardHeader>
          <CardBody>
            <AvForm  onValidSubmit={(e, v) => {
              handleValidSubmit(e, v);
            }}  >
              <Row>
                {successMessage && <div className="success">{successMessage}</div>}
                {error &&  <div className="error">{error}</div>}
                <Col md="6">
                  <FormGroup className="mb-3">
                    
                    <AvField
                      name="firstName"
                      type="text"
                      errorMessage="First name is required"
                      validate={{ required: { value: true } }}
                      label="First Name"
                      className="lead-form-input"
                    />
                    
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    
                    <AvField
                      name="lastName"
                      type="text"
                      errorMessage="Last name is required"
                      validate={{ required: { value: true } }}
                      id="validationCustom02"
                      label="Last Name"
                      className="lead-form-input"
                    />
                    
                  </FormGroup>
                </Col>
             
                <Col md="6">
                  <FormGroup className="mb-3">
                  
                    <AvField
                      name="email"
                      type="email"
                      errorMessage="Email is required"
                      validate={{ required: { value: true } }}
                      id="validationCustom03"
                      label="Email"
                      className="lead-form-input"
                    />
                   
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <AvField
                      name="phone"
                      type="text"
                      errorMessage="Phone is required"
                      validate={{ required: { value: true } }}
                      id="validationCustom04"
                      label="Phone"
                      className="lead-form-input"
                    />
                    
                  
                  </FormGroup>
                </Col>
                
                <CountryDropDown/>
                
                
                <FormGroup className="mb-3" >
                  
                  <AvField
                    name="password"
                    type="password"
                    errorMessage="Password is required"
                    validate={{ required: { value: true } }}
                    id="validationCustom04"
                    label="Password"
                    className="lead-form-input"
                  />
                  
                </FormGroup>
                
              </Row>
              <div className="buttons-div">  
                <Button color="secondary" onClick={hideForm}>Cancel</Button>
                <Button  color="primary" type="submit">
                         Add Lead
                </Button>

              </div>      
              
            </AvForm>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
      
  );
}
export default LeadForm;