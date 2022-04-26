// page for the second step of the system email creation process
// where the admin would get all available languages from the backend then
//  choose any number of languages each with its own content
// then finally submit the new system email
import React from "react";
import {
  connect
} from "react-redux";

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  CardTitle
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


function SystemEmailsList(props){
  // TODO delete modal needs to be handled here 
  // when to appear to disappear 

  return (
    <React.Fragment>
      {/* TODO check again what to do if the admin wanna add another language 
          then what the whole process should look like*/}
      <div className="page-content">
        <div className="container-fluid">
          <h2>Adding new system email</h2>
          <Row>
            <Col className="col-12">
              <Row>
                <Card>
                  <CardBody>
                    <CardTitle>Adding new system email (final step)</CardTitle>
                    <Form method="post">
                      {/* first input field will be populated with props.title */}
                      <label htmlFor="title">System email title</label>
                      <input id="title" type="text" className="form-control form-control" value={props.title} />


                      {/* second input field will be populated with props.action */}
                      <label htmlFor="action">System email action</label>
                      <input id="action" type="text" className="form-control" value={props.action} />


                      {/* final input field the language dropdown */}
                      {/* TODO setup a default placeholder for the dropdown right now it takes
                          first option as a default placeholder */}
                      <label htmlFor="languageDropdown">Available languages dropdown</label>
                      <select id="languageDropdown" className="form-select">
                        <option>first option</option>
                        <option>second option</option>
                        <option>third option</option>
                      </select>
                      
                      {/* finally the content input section */}
                      <label htmlFor="content">System email content</label>
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        placeholder="System email content"
                        id="content"
                      />
                    </Form>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.systemEmailsReducer.loading || false,
  docs: state.systemEmailsReducer.docs || [],
  page: state.systemEmailsReducer.page || 1
});

export default connect(mapStateToProps, null)(SystemEmailsList);
