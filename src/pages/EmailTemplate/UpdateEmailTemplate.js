import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import {
  Button, Form, FormGroup, Label, Input, FormText 
} from "reactstrap";

import Breadcrumb from "../../components/Common/Breadcrumb";

const UpdateEmailTemplate = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Update email template</title>
        </MetaTags>
                
        <Container fluid>
          <Breadcrumb title="Update an email template" breadcrumbItem="Update an email template" />
          {/* where the actual content should be */}
          {/* I just need to make sure this is the correct location for this form */}
          {/* it's either here or in components but either ways it's the same code so let's get it over with */}
          <form className="">
            <div className="mb-3">
              <label htmlFor="activation event" className="form-label">Activation event</label>
              <input id="activation event" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="ematil template content" className="form-label">Ematil template content</label>
              <input id="ematil template content" type="text" className="form-control" />
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary w-md">Update</button>
            </div>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdateEmailTemplate;