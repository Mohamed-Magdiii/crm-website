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
import { useParams } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import CustomDropdown from "components/Common/CustomDropDown";
import { fetchClientWithdrawals } from "store/transactions/withdrawal/action";
import {
  depositRejectStart, 
  depositApproveStart,
  fetchClientDeposits  
} from "store/transactions/deposit/action";
import Notification from "components/Common/Notification";
import logo from "assets/images/logo-sm.svg";

function ClientTransactions(props) {
  const pathParams = useParams();
  const clientId = pathParams.id;
  const [showNotication, setShowNotifaction] = useState(false);
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [selectedTransactionType, setSelectedTransactionType] = useState("Withdrawal");
  const transactionTypes = ["Withdrawal", "Deposit"];
  const dispatch = useDispatch();

  const changeTransactionTypeHandler = (e) => {
    setSelectedTransactionType(e.target.innerText);
  };
  const loadClientTransactionsdetails = () => {
    dispatch(fetchClientDeposits(clientId));
    dispatch(fetchClientWithdrawals(clientId));
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
      dataField:"checkbox",
      text: <input type="checkbox"/>
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    }, 
    {
      dataField:"customerId",
      text:props.t("Client"),
      formatter:(val)=>(val.customerId ? `${val.customerId.firstName} ${val.customerId.lastName}` : "")
    },
    {
      dataField:"gateway",
      text:props.t("Gateway")
    },
    {
      dataField: "currency",
      text: props.t("Currency"),
    
    },
    {
      dataField: "status",
      text: props.t("Status"),
      
    },
    {
      dataField: "reason",
      text: props.t("Reason"),
      formatter: (item) => (
        item.reason ? item.reason : "-"
      )
    },
    {
      dataField: "amount",
      text: props.t("Amount"),
      formatter: (item) => (
        item.amount === " " ? "-" : parseFloat(item.amount)
      )
    },
    {
      dataField: "comments",
      text: props.t("Comments"),
      formatter: (item) => (
        item.comments.length === 0 ? "-" : item.comments
      )
    },
    {
      dataField:"dropdown", 
      text:props.t("Action")
    },
  ];

  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          {/* notification if selected transaction type is deposit */}
          {selectedTransactionType === "Deposit" && 
            <Notification
              onClose={closeNotifaction}
              body={props.t("The deposit has been updated successfully")}
              show={showNotication}
              header={props.t("Deposit Update")}
              logo={logo}
            />
          }
          {/* notification if selected transaction type is withdrawal */}
          {selectedTransactionType === "Withdrawal" && 
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
                    {props.t("Transactions list")} ({selectedTransactionType === "Withdrawal" ? props.withdrawalsTotalDocs : props.depositsTotalDocs})
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
                        {/* if no records show "No records" otherwise show records */}
                        {
                          // if deposits is selected then render clientDeposits
                          selectedTransactionType === "Deposit"
                            ?
                            // if deposits is selected but no data to show
                            props.depositsTotalDocs === 0 
                              ?
                              <Tbody>
                                {props.loading && <TableLoader colSpan={4} />}                            
                                {!props.loading && /*props.totalDocs === 0 && */
                                  <>
                                    <Tr>
                                      <Td colSpan={"100%"} className="fw-bolder text-center" st="true">
                                        <h3 className="fw-bolder text-center">No records</h3>
                                      </Td>
                                    </Tr>
                                  </>
                                }
                              </Tbody>
                              :
                              // if deposits is selected and there is data to show
                              <Tbody>
                                {props.loading && <TableLoader colSpan={4} />}
                                {!props.depositLoading && props.clientDeposits.map((row, rowIndex) =>
                                  <Tr key={rowIndex}>
                                    {columns.map((column, index) =>
                                      <Td key={`${rowIndex}-${index}`}>
                                        { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                        { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                        {/* {column.dataField === "dropdown" ? <CustomDropdown  permission={props.depositsPermissions.actions ? true : false} id={row._id} status={row.status} approve={depositApprove} reject={depositReject} /> : ""} */}
                                      </Td>
                                    )}
                                  </Tr>
                                )}
                              </Tbody>
                            :
                            // if withdrawals is selected 
                            props.withdrawalsTotalDocs === 0 
                              ?
                              // if withdrawals is seleceted but no data to show
                              <Tbody>
                                {props.loading && <TableLoader colSpan={4} />}  
                                {!props.withdrawalLoading &&
                                  <>
                                    <Tr>
                                      <Td colSpan={"100%"} className="fw-bolder text-center" st="true">
                                        <h3 className="fw-bolder text-center">No records</h3>
                                      </Td>
                                    </Tr>
                                  </>
                                }
                              </Tbody>
                              :
                              // if withdrawals is selected and there is data to show
                              <Tbody>
                                {props.loading && <TableLoader colSpan={4} />}
                                {(!props.loading && props.clientWithdrawals) && props.clientWithdrawals.map((row, rowIndex) =>
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
                              </Tbody>
                        }
                      </Table>
                      {/* if deposits is selected */}
                      {
                        (props.clientDeposits && selectedTransactionType === "Deposit") && 
                        <CustomPagination
                          {...props}
                          docs={props.clientDeposits}
                          setSizePerPage={setSizePerPage}
                          sizePerPage={sizePerPage}
                          onChange={loadClientTransactionsdetails}
                        />
                      }
                      {/* if withdrawals is selected */}
                      {
                        (props.clientWithdrawals && selectedTransactionType === "Withdrawal") && 
                        <CustomPagination
                          {...props}
                          docs={props.clientWithdrawals}
                          setSizePerPage={setSizePerPage}
                          sizePerPage={sizePerPage}
                          onChange={loadClientTransactionsdetails}
                        />
                      }
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
  depositLoading: state.depositReducer.loading,
  withdrawalLoading: state.withdrawalReducer.loading,
  error: state.clientReducer.error,
  clientDeposits: state.depositReducer.clientDeposits,
  clientWithdrawals: state.withdrawalReducer.clientWithdrawals,
  errorDetails: state.clientReducer.errorDetails,
  depositsTotalDocs: state.depositReducer.depositsTotalDocs,
  withdrawalsTotalDocs: state.withdrawalReducer.withdrawalsTotalDocs
});

export default connect(mapStateToProps, null)(withTranslation()(ClientTransactions));
