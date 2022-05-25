import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  CardBody, Card, CardTitle, CardHeader, Col, Row
} from "reactstrap";
import EmailProviderAdd from "./EmailProviderAdd";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

function EmailProvidersTab(props){
  const columns = [
    {
      dataField:"emailProvider",
      text:"Email Providers"
    }, 
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => (
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
      ),
    }
  ];
  const customData = props.dictionary[0] ? props.emailProviders.map(emailProvider=>{
    return {
      id:Math.random(),
      emailProvider
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
                  <CardTitle>Email Providers</CardTitle>
                  <EmailProviderAdd />
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
  emailProviders :state.dictionaryReducer.emailProviders || [],
  id:state.dictionaryReducer.id
});

export default connect(mapStateToProps, null)(EmailProvidersTab);