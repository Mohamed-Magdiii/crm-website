import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {useDispatch, connect} from "react-redux";
import {
  CardBody
} from "reactstrap";
import TableLoader from "components/Common/TableLoader";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import { Link } from "react-router-dom";
function ExchangesTab(props){
  
  
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
                  <Th>Exchanges</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {props.dictionary[0] ? <Tbody>
                {props.loading && <TableLoader colSpan={4} />}
                {!props.loading && props.dictionary[0].exchanges.map((row, rowIndex) =>
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
  dictionary:state.dictionaryReducer.dictionary || []
});
export default connect(mapStateToProps, null)(ExchangesTab);