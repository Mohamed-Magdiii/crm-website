import React from "react";
import { 
  useDispatch, connect 
} from "react-redux";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";
import InternalTransfer from "./InternalTransfer";

function InternalTransferIndex(){
  const dispatch = useDispatch();
  
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Internal Transfers
        </title>
      </MetaTags>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>Internal Transfers</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <InternalTransfer />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
});
export default connect(mapStateToProps, null)(InternalTransferIndex);