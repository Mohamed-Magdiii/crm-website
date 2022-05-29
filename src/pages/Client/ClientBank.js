import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";


// i18n
import { withTranslation } from "react-i18next";
import { fetchClientBankAccount } from "store/client/actions";
import ClientAddBankAccountModal from "./ClientAddBankAccountModal";

function ClientBank(props) {
  const [sizePerPage, setSizePerPage] = useState(5);
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientBankDetails = () => {
    dispatch(fetchClientBankAccount(clientId));
  };
  useEffect(() => {
    loadClientBankDetails();
  }, []);

  const columns = [
    {
      dataField: "bankName",
      text: props.t("Bank name")
    },
    {
      dataField: "swift",
      text: props.t("Swift")
    },
    {
      dataField: "bankAddress",
      text: props.t("Bank address")
    },
    {
      dataField: "iban",
      text: props.t("IBAN")
    }, 
    {
      dataField: "accountNumber",
      text: props.t("Account number")
    },
    {
      dataField: "currency",
      text: props.t("Currenct")
    },
    {
      dataField: "beneficiaryName",
      text: props.t("Beneficiary name")
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Actions"), 
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
            ></i>
          </Link>
        </div>
      )
    },
  ];
  
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>{props.t("Bank accounts list")} ({props.totalDocs})</CardTitle>
                  <ClientAddBankAccountModal /> 
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
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.clientBankAccountDetails.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadClientBankDetails}
                      />
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
  clientBankAccountDetails: state.clientReducer.clientBankAccountDetails || [],
  error: state.clientReducer.error,
  errorDetails: state.clientReducer.errorDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientBank));
