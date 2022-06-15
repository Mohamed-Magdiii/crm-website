import React from "react";
import { connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";

function ClientDetailsHeader(props){
  const { clientId, clientDetails = {} } = props;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="card-h-50 card">
            <div className="card-body">
              <div className="align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    {clientDetails.recordId}
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {clientDetails.firstName + " " + clientDetails.lastName}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-50 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Created on
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {clientDetails.createdAt ? (clientDetails.createdAt).split("T")[0] : " "}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-50 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Status
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {clientDetails.isActive ? "Active" : "Inactive"}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-50 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-8">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Category
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {clientDetails.category}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetailsHeader));