import React from "react";

import {useDispatch, connect} from "react-redux";
import {
  CardBody, CardHeader, Card, CardTitle, Col, Row
} from "reactstrap";

import { Link } from "react-router-dom";
import ExchangeAddModal from "./ExchangeAddModal";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
function ExchangesTab(props){ 
  const columns = [
    {
      dataField:"exchange",
      text:"Exchanges"
    }, 
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => {
        
        return (
          <div className="d-flex gap-3">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => {}}
              ></i>
            </Link>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => {}}
              ></i>
            </Link>
          </div>
        );
      }
    }
  ];
  const customData = props.dictionary[0] ? props.exchanges.map(exchange=>{
    return {
      id:Math.random(),
      exchange
    };
  }) : [] ; 
  return (

    <React.Fragment>
      <div className="container-fluid">
  
        <Row>
          <Col>
            <Card>
              <CardHeader className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Exchanges</CardTitle>
                  <ExchangeAddModal/>
                </div>
              </CardHeader>
              <CardBody>

                <div className="table-responsive">
                  <BootstrapTable
                    keyField="id"
                    data={customData}
                    columns={columns}
                    cellEdit={cellEditFactory({ 
                      mode: "click", 
                  
                    }
                    )}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || [],
  exchanges: state.dictionaryReducer.exchanges  || []
});
export default connect(mapStateToProps, null)(ExchangesTab);