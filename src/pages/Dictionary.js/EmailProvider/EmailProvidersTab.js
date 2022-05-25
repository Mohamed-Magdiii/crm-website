import React from "react";
import {useDispatch, connect} from "react-redux";
import TableLoader from "components/Common/TableLoader";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import { Link } from "react-router-dom";
import {
  CardBody, Card, CardTitle, CardHeader
} from "reactstrap";
import EmailProviderAdd from "./EmailProviderAdd";
function EmailProvidersTab(props){
  return (

    <React.Fragment>
      <Card>
        <CardHeader className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between  align-items-center">
            <CardTitle>Actions</CardTitle>
            <EmailProviderAdd/>
          </div>
        </CardHeader>
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
                    <Th>Email Providers</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                {props.dictionary[0] ? <Tbody>
                  {props.loading && <TableLoader colSpan={4} />}
                  {!props.loading && props.dictionary[0].emailProviders.map((row, rowIndex) =>
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
      </Card>
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || []
});

export default connect(mapStateToProps, null)(EmailProvidersTab);