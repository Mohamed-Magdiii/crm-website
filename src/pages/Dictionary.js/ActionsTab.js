import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {useDispatch, connect} from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";
import TableLoader from "components/Common/TableLoader";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import { Link } from "react-router-dom";

function ActionsTab(props){
  const columns = [
    {
      dataField:"actions",
      text:"Actions"
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
                
            ></i>
          </Link>
        </div>
      )
    }
  ];
  
  return (
    <React.Fragment>
      <CardBody>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table "
            >
              <Thead>
                <Tr>
                  {columns.map((column, index) =>
                    <Th data-priority={index} key={index}>{column.text}</Th>
                  )}
                </Tr>
              </Thead>
              {props.dictionary[0] ? <Tbody>
                {props.loading && <TableLoader colSpan={4} />}
                {!props.loading && props.dictionary[0].actions.map((row, rowIndex) =>
                  <Tr key={rowIndex}>
                    <Td>{row}</Td>
                    <Td>
                      <div className="d-flex gap-3">
                        <Link className="text-success" to="#">
                          <i
                            className="mdi mdi-pencil font-size-18"
                            id="edittooltip"
                          
                          ></i>
                        </Link>
                      </div>
                    </Td>
                  </Tr>
                  
                )}
              </Tbody> : <Tbody></Tbody>
              }
            </Table>
       
          </div>
        </div>
      </CardBody>
     
     
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
});
export default connect(mapStateToProps, null)(ActionsTab);