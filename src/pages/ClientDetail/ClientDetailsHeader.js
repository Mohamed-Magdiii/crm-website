import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";
import { fetchClientDetails } from "../../store/client/actions";

function ClientDetailsHeader(props){
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };

  useEffect(() => {
    loadClientDetails();
  }, []);
  
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="card-h-50 card">
            <div className="card-body">
              <div className="align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    {props.clientDetails.firstName + " " + props.clientDetails.lastName}
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {clientId}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-100 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Created on
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {props.clientDetails.createdAt ? (props.clientDetails.createdAt).split("T")[0] : " "}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-100 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Status
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {props.clientDetails.isActive ? "Active" : "Inactive"}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 col-xs-3">
          <div className="card-h-100 card">
            <div className="card-body">
              <div className="align-items-center row">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Category
                  </span>
                  <h6 className="mb-1">
                    <span className="counter-value">
                      {props.clientDetails.category}
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

const mapStateToProps = (state) => ({
  clientDetails: state.clientReducer.clientDetails,
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetailsHeader));