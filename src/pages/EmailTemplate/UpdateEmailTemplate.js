import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";

const UpdateEmailTemplate = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Update email template</title>
        </MetaTags>
                
        <Container fluid>
          {/* where the actual content should be */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdateEmailTemplate;