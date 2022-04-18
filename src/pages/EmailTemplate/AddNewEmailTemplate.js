// this page will be reached only from the +Add button in the email 
// template listing page 
import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";

// import breakcrubs
import BreadCrumb from "../../components/Common/Breadcrumb";

const AddNewEmailTemplate = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add new email template</title>
        </MetaTags>

        <BreadCrumb title="Add new email template" breadcrumbItem="Add new email template" />
        <Container fluid>
          <form className="">
            <div className="mb-3">
              <label htmlFor="email template content" className="form-label">Email template content</label>
              <input id="email template content" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="activation event" className="form-label">Activation event</label>
              <input id="activation event" type="text" className="form-control" />
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary w-md">Add</button>
            </div>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewEmailTemplate;