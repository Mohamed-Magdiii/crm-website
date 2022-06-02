import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, 
  CardTitle, CardHeader, 
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// i18n
import { withTranslation } from "react-i18next";
import { fetchClientTransactions } from "store/client/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import CustomDropdown from "components/Common/CustomDropDown";
import {
  depositRejectStart, depositApproveStart  
} from "store/transactions/deposit/action";
import Notification from "components/Common/Notification";
import logo from "../../assets/images/logo-sm.svg";

function ClientTransactions(props) {
  const [showNotication, setShowNotifaction] = useState(false);
  const [btnprimary1, setBtnprimary1] = useState(false);
  const transactionTypes = ["withdrawal", "deposit"];
  const clientId = props.clientId;
  const [sizePerPage, setSizePerPage] = useState(5);
  const [selectedTransactionType, setSelectedTransactionType] = useState("withdrawal");
  const dispatch = useDispatch();

  const changeTransactionTypeHandler = (e) => {
    setSelectedTransactionType(e.target.innerText);
  };
  const loadClientTransactionsdetails = () => {
    dispatch(fetchClientTransactions(clientId));
  };
  useEffect(() => {
    loadClientTransactionsdetails();
  }, [selectedTransactionType]);

  const depositApprove = (id)=>{
    dispatch(depositApproveStart(id));
    setShowNotifaction(true);
  };
  const depositReject = (id)=>{
    dispatch(depositRejectStart(id));
    setShowNotifaction(true);
  };
  const closeNotifaction = () => {
    setShowNotifaction(false);
  };

  const columns = [
    {
      dataField: "checkbox",
      text: <input type="checkbox"/>
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    }, 
    {
      dataField: "customerId",
      text: props.t("Client"),
      formatter:(val)=>(val.customerId ? `${val.customerId.firstName} ${val.customerId.lastName}` : "")
    },
    {
      dataField: "gateway",
      text: props.t("Gateway")
    },
    {
      dataField: "currency",
      text: props.t("Currency")
    },
    {
      dataField: "status",
      text: props.t("Status")
    },
    {
      dataField: "amount",
      text: props.t("Amount")
    },
    {
      dataField: "dropdown", 
      text: props.t("Action")
    }
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* notification if selected transaction type is deposit */}
          {selectedTransactionType === "deposit" && 
            <Notification
              onClose={closeNotifaction}
              body={props.t("The deposit has been updated successfully")}
              show={showNotication}
              header={props.t("Deposit Update")}
              logo={logo}
            />
          }
          {/* notification if selected transaction type is withdrawal */}
          {selectedTransactionType === "withdrawal" && 
            <Notification onClose={closeNotifaction}
              body={props.t("The update of the withdraw has been made successfully")}
              show={showNotication}
              header={props.t("Withdraw update")}
              time={props.t("Now")}
              logo={logo}
            />
          }
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Transactions list")} ({selectedTransactionType === "withdrawal" ? props.withdrawalsTotalDocs : props.depositsTotalDocs})
                  </CardTitle>
                  <Dropdown
                    isOpen={btnprimary1}
                    toggle={() => {setBtnprimary1(!btnprimary1)}}
                  >
                    <DropdownToggle tag="button" className="btn btn-primary">
                      {selectedTransactionType} <i className="mdi mdi-chevron-down" />
                    </DropdownToggle>
                    <DropdownMenu>
                      {transactionTypes.map((transactionType) => (
                        <DropdownItem 
                          key={transactionTypes.indexOf(transactionType)}
                          onClick={(e) => {changeTransactionTypeHandler(e)}}
                        >
                          {props.t(transactionType)}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
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
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {column.dataField === "dropdown" ? <CustomDropdown  id={row._id} status={row.status} approve={depositApprove} reject={depositReject} /> : ""}
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
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {column.dataField === "dropdown" ? <CustomDropdown  id={row._id} status={row.status} approve={depositApprove} reject={depositReject} /> : ""}
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
