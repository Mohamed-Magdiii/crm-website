import React from "react";
import { connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";
import Loader from "components/Common/Loader";

function ClientDetailsHeader(props){
  const { clientDetails = {} } = props;
  const [kycStatus, setKycStatus] = React.useState("Pending");
  React.useEffect(()=>{
    if (clientDetails && clientDetails.stages) {
      if (clientDetails.stages.kycRejected) setKycStatus("Rejected");
      else if (clientDetails.stages.kycApproved) setKycStatus("Approved");
      else setKycStatus("Pending");
    }
  }, [clientDetails]);
  /**
   * 
   * {
  "madeDeposit":false,
  "emailVerified":false,
  "phoneVerified":false,
  "individual":{
  "updateProfile":false,
  "startTrading":false
  }
  }
  * 
  */
  return (
    <React.Fragment>
      <div className="row p-2 client-detail-header">
        <div className="name" >
          <div className="card-h-100 card card-animate">
            <div className="card-body">
              <div className="align-items-center">
                {props.clientProfileloading && <Loader />}
                {!props.clientProfileloading &&
                  <div >
                    <span className="text-muted mb-3 lh-1 d-block text-truncate">
                      {clientDetails.recordId}
                    </span>
                    <h6 className="mb-1">
                      <span className="counter-value">
                        {clientDetails.firstName + " " + clientDetails.lastName}
                      </span>
                    </h6>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="date">
          <div className="card-h-100 card card-animate">
            <div className="card-body">
              <div className="align-items-center row">
                {props.clientProfileloading && <Loader />}
                {!props.clientProfileloading &&
                  <div >
                    <span className="text-muted mb-3 lh-1 d-block text-truncate">
                      Created on
                    </span>
                    <h6 className="mb-1">
                      <span className="counter-value">
                        {clientDetails.createdAt ? (clientDetails.createdAt).split("T")[0] : " "}
                      </span>
                    </h6>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="status">
          <div className="card-h-100 card card-animate">
            <div className="card-body">
              <div className="align-items-center row">
                {props.clientProfileloading && <Loader />}
                {!props.clientProfileloading &&
                  <>
                    <div className="">
                      <span className="text-muted mb-3 lh-1 d-block text-truncate">
                        Status
                      </span>
                      <h6 className="mb-1">
                        <span className="counter-value">
                          {clientDetails.isActive ? "Active" : "Inactive"}
                        </span>
                      </h6>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="category">
          <div className="card-h-100 card card-animate">
            <div className="card-body">
              <div className="align-items-center row">
                {props.clientProfileloading && <Loader />}
                {!props.clientProfileloading &&
                  <>
                    <div className="">
                      <span className="text-muted mb-3 lh-1 d-block text-truncate">
                        Category
                      </span>
                      <h6 className="mb-1">
                        <span className="counter-value">
                          {clientDetails.category}
                        </span>
                      </h6>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="stage">
          <div className="card-h-100 card card-animate">
            <div className="card-body">
              <div className="align-items-center row">
                {props.clientProfileloading && <Loader />}
                {!props.clientProfileloading &&
                  <div >
                    <span className="text-muted mb-3 lh-1 d-block text-truncate">
                      KYC Status
                    </span>
                    <h6 className="mb-1">
                      <span className="counter-value">
                        {kycStatus}
                      </span>
                    </h6>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  clientProfileloading: state.clientReducer.clientProfileloading,
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetailsHeader));
