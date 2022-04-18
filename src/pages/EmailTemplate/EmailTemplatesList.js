import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";

// import breadcrumbs
import Breadcrumb from "../../components/Common/Breadcrumb";
import EmailTemplateList from "../../components/EmailTemplate/email.record.list.component";

const EmailTemplatesList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Email templates listing</title>
        </MetaTags>
        <Container fluid>
          {/* render breadcrumbs */}
          {/* so breadcrumb is some kinda pre created component just gonna use it until 
              and hopefully with time I'll get to know what is it exactly */}
          <Breadcrumb title="Email templates listing" breadcrumbItem="Email templates listing" />
          {/* where the actual listing should be */}
          <EmailTemplateList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmailTemplatesList;
