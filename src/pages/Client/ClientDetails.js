import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "./ClientList.styles.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import TableLoader from "components/Common/TableLoader";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails } from "store/client/actions"; 

function ClientDetails(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };
  useEffect(() => {
    loadClientDetails();

  }, []);

  const columns = [
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    },
    {
      dataField: "firstName",
      text: props.t("Name")
    },
    {
      dataField: "category",
      text: props.t("type")
    },
    {
      dataField: "email",
      text:props.t("Email"),
    },
    {
      dataField: "phone",
      text: props.t("Phone"),
    },
    {
      dataField: "country",
      text: props.t("country"),
    },
    {
      dataField: "agent",
      text:props.t("Agent"),
      formatter: (val) => (val.agent ? val.agent._id : "-"),
    },
    {
      dataField: "source",
      text:props.t("Source")
    },
    {
      dataField: "stages",
      text: props.t("KYC"),
      formatter: (val) => {
        if (val.stages) {
          const { kycApproved, kycRejected } = val.stages;
          if (kycApproved) {
            return "Approved";
          }
          if (kycRejected) {
            return "Rejected";
          }
          else {
            return "Pending";
          }
        }
        else {
          return "Pending";
        }
      }
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Action")
    },
  ];


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
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
                        <Tbody>
                          {/* {props.loading && <TableLoader colSpan={4} />} 
                          {!props.loading && JSON.stringify(props.clientDetails)} */}
                          {/* {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.clientDetails.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )} */}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientDetails: state.clientReducer.clientDetails,
  error: state.clientReducer.error,
  errorDetials: state.clientReducer.errorDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));