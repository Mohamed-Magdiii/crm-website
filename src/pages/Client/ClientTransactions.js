import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


// i18n
import { withTranslation } from "react-i18next";
import { fetchClientTransactions } from "store/client/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";

function ClientTransactions(props) {
  const transactionTypes = ["withdrawal", "deposit"];
  const clientId = props.clientId;
  const [sizePerPage, setSizePerPage] = useState(5);
  const [selectedTransactionType, setSelectedTransactionType] = useState("withdrawal");
  const dispatch = useDispatch();

  const changeTransactionTypeHandler = (e) => {
    setSelectedTransactionType(e.target.value);
  };
  const loadClientTransactionsdetails = () => {
    dispatch(fetchClientTransactions(clientId));
  };
  useEffect(() => {
    loadClientTransactionsdetails();
  }, [selectedTransactionType]);

  const columns = [
    {
      dataField: "gateway",
      text: props.t("Gateway")
    },
    {
      dataField: "walletId",
      text: props.t("Wallet Id"),
      formatter: (item) => (
        item.walletId._id
      )
    },
    {
      dataField: "amount",
      text: props.t("Amount")
    }, 
    {
      dataField: "note",
      text: props.t("Note")
    },
    {
      dataField: "customerId",
      text: props.t("Customer Id"),
      formatter: (item) => (
        item.customerId.firstName + " " + item.customerId.lastName
      )
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Actions"),
      formatter: () => (
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
                  <CardTitle>
                    {props.t("Transactions list")} ({selectedTransactionType === "withdrawal" ? props.withdrawalsTotalDocs : props.depositsTotalDocs})
                  </CardTitle>
                  <AvForm >
                    <div className="col-sm-12">
                      <AvField
                        name="language"
                        id="Available languages"
                        placeholder={props.t("Available languages")}
                        type="select"
                        onChange={changeTransactionTypeHandler}
                        value={props.t(selectedTransactionType)}
                      >
                        {transactionTypes.map(transactionType => (
                          <option key={transactionTypes.indexOf(transactionType)} value={transactionType}>
                            {props.t(transactionType)}
                          </option>
                        ))}
                      </AvField>
                    </div>
                  </AvForm>
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
                        {/* if deposits is selected then render clientDeposits */}
                        {(selectedTransactionType === "deposit" && props.clientDeposits) && <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.clientDeposits.result.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>}
                        {/* if withdrawals is selected then render clientWithdrawal */}
                        {(selectedTransactionType === "withdrawal" && props.clientWithdrawal) && <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.clientWithdrawal.result.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>}
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadClientTransactionsdetails}
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
  error: state.clientReducer.error,
  clientDeposits: state.clientReducer.clientDeposits,
  clientWithdrawal: state.clientReducer.clientWithdrawal,
  errorDetails: state.clientReducer.errorDetails,
  depositsTotalDocs: state.clientReducer.depositsTotalDocs,
  withdrawalsTotalDocs: state.clientReducer.withdrawalsTotalDocs
});

export default connect(mapStateToProps, null)(withTranslation()(ClientTransactions));
