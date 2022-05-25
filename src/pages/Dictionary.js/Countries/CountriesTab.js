import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {useDispatch, connect} from "react-redux";
import {
  CardBody, Card, CardTitle, CardHeader, Col, Row
} from "reactstrap";
import { Link } from "react-router-dom";
import CountriesAdd from "./CountriesAdd";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
function CountriesTab(props){
  const columns = [
    {
      dataField:"alpha2",
      text:"Alpha2"
    }, 
    {
      dataField:"alpha3",
      text:"Alpha3"
    },
    {
      dataField:"callingCode",
      text:"Calling Code"
    },
    {
      dataField:"ar",
      text:"AR"
    },
    {
      dataField:"en",
      text:"EN"
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
 
  return (

    <React.Fragment>
      <div className="container-fluid">
  
        <Row>
          <Col>
            <Card>
              <CardHeader className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Exchanges</CardTitle>
                  <CountriesAdd/>
                </div>
              </CardHeader>
              <CardBody>

                <div className="table-responsive">
                  <BootstrapTable
                    keyField="id"
                    data={props.countries}
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
  countries :state.dictionaryReducer.countries || [],
  
});
export default connect(mapStateToProps, null)(CountriesTab);