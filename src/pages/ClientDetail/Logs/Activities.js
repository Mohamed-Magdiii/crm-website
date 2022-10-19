import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, 
  CardTitle, CardHeader
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// i18n
import { withTranslation } from "react-i18next";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { fetchLogs } from "store/actions";
import { 
  TRIGGERED_BY, 
  LOG_LEVELS, 
  LOG_TYPES,
} from "constants/logs";

const formatDate = (date) => {
  let d = new Date(date);
  return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
};

function Activities(props) {
//   const clientId = props.clientId;
// const dispatch = useDispatch();
  const [sizePerPage, setSizePerPage] = useState(10);
  const generateLogs = (data) => {
    const {
      type,
      customerId,
      content = {},
      details = {}
    } = data;
    const { ip, error, to, } = details;
    const { firstName, lastName } = customerId;
    let message = "";
    if (error) {
      message = error;
      return message;
    }
    const name = `${firstName} ${lastName}`;
    const { 
      amount,
      currency,
      status,
      symbol,
      mPrice,
      fromAsset,
      toAsset,
      asset,
    } = content;
    switch (type) {
      case LOG_TYPES.REGISTER:
        message = `${name} ${props.t("has registered from")} ${content.source} ${props.t("from IP")} ${ip}`;  
        break;
      case LOG_TYPES.LOGIN: 
        message = `${name} ${props.t("has logged in from")} ${ip}`;
        break;
      case LOG_TYPES.UPDATE_PROFILE:
        message = `${name} ${props.t("has updated their profile")}`;
        break;
      case LOG_TYPES.CONVERT_CUSTOMER:
        message = `${name} ${props.t("has been converted to")} ${props.t(to)}`;
        break;
      case LOG_TYPES.RESET_PASSWORD:
        message = `${name} ${props.t("has changed password from IP")} ${ip}`;
        break;
      case LOG_TYPES.DEPOSIT:
        message = `${name} ${props.t("has made a deposit of")} ${amount.$numberDecimal || amount} ${currency} ${props.t("and it is")} ${status}`;
        break;
      case LOG_TYPES.WITHDRAW:
        message = `${name} ${props.t("has made a withdrawal of")} ${amount.$numberDecimal || amount} ${currency} ${props.t("and it is")} ${status}`;
        break;
      case LOG_TYPES.ORDER:
        message = `${name} ${props.t("has placed an order of")} ${amount} ${symbol} ${props.t("for price")} ${mPrice} ${props.t("and it is")} ${status}`;
        break;
      case LOG_TYPES.CONVERT:
        message = `${name} ${props.t("has converted")} ${amount} ${fromAsset} ${props.t("to")} ${toAsset}`;
        break;
      case LOG_TYPES.WALLET:
        message = `${props.t("Creation of wallet was successful")} (${asset})`;
        break;
        // bank accs
      case LOG_TYPES.ADD_BANK_ACCOUNT:
        message = `${props.t(`New ${content.bankName} bank account added`)}`;
        break;
      case LOG_TYPES.EDIT_BANK_ACCOUNT:
        message = `${props.t(`${content.bankName} bank info changed`)}`;
        break;
      case LOG_TYPES.DELETE_BANK_ACCOUNT:
        message = `${props.t("A bank account has been deleted")}`;
        break;
        //docs
      case LOG_TYPES.CHANGE_DOC_STATUS:
        message = `${props.t(`Document status is ${details.status} ${details.rejectionReason ? `, reason is ${details.rejectionReason}` : ""}`)}`;
        break;
      case LOG_TYPES.OVERWRITE_DOCS:
        message = `${props.t("Document(s) has been overwritten")}`;
        break;
      case LOG_TYPES.UPLOAD_DOCS:
        message = `${content.type } ${props.t("document(s) has been uploaded")}`;
        break;
        // todos
      case LOG_TYPES.ADD_TODO:
        message = `${props.t(`${content.type == "0" ? "Todo" : "Reminder"}`)} ${content.note} ${props.t("at")} ${formatDate(content.timeEnd)}` ;
        break;
      case LOG_TYPES.EDIT_TODO:
        message = `${props.t(`${content.type == "0" ? "Todo" : "Reminder"}`)} ${props.t("has been edited")}` ;
        break;
      case LOG_TYPES.DELETE_TODO:
        message = `${props.t(`${content.type == "0" ? "Todo" : "Reminder"}`)} ${props.t("has been deleted")}` ;
        break;
        // customer
      case LOG_TYPES.EDIT_CUSTOMER_INFO:
        message = `${props.t("Profile information has been updated")}` ;
        break;
      case LOG_TYPES.PROFILE_COMPLETED:
        message = `${props.t("Customer has completed his profile")}` ;
        break;
    }
    return message;
  };

  const getTriggeredBy = (val) => {
    let message = "";
    if (val.triggeredBy === 0) {
      const {
        firstName,
        lastName,
      } = val.customerId;
      message = `${firstName} ${lastName}`;
    } else if (val.triggeredBy === 1) {
      const {
        firstName,
        lastName,
      } = val.userId;
      message = `${firstName} ${lastName}`;
    } else {
      message = "System";
    }
    return message;
  };

  const columns = [
    {
      dataField: "recordId",
      text: props.t("ID")
    },
    {
      dataField: "triggeredBy",
      text: props.t("Triggered By"),
      formatter: (val) => getTriggeredBy(val),
    }, 
    {
      dataField: "level",
      text: props.t("Log Level"),
      formatter: (val)=>(LOG_LEVELS[val.level] ? LOG_LEVELS[val.level] : "Err"),
    },
    {
      dataField: "type",
      text: props.t("Log Type"),
      formatter: (val)=>(LOG_TYPES[val.type] ? LOG_TYPES[val.type] : "Err"),
    },
    {
      dataField: "createdAt",
      text: props.t("Date Created"),
      formatter: (val) => formatDate(val.createdAt),
    },
    {
      dataField: "content",
      text: props.t("Message"),
      formatter: (val) => (generateLogs(val))
    }, 
  ];

  const dispatch = useDispatch();
  const fetchData = async (page) => {
    dispatch(fetchLogs({
      page: page || 1,
      limit: sizePerPage,
      customerId: props.clientId,
    }));
  };

  useEffect(()=>{
    fetchData();
  }, []);

  useEffect(()=>{
    fetchData(1);
  }, [sizePerPage, 1]);

  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Activities")}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table  table-hover "
                      >
                        <Thead className="text-center table-light" >
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}                            
                          {!props.loading && props.todos.length === 0 &&
                            <>
                              <Tr>
                                <Td colSpan={"100%"} className="fw-bolder text-center" st="true">
                                  <h3 className="fw-bolder text-center">No records</h3>
                                </Td>
                              </Tr>
                            </>
                          }
                          {!props.loading && props.todos.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`} className="text-center">
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                              
                      </Table>
                      <CustomPagination
                        {...props.pagination}
                        docs={props.todos}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={fetchData}
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
  clientDetails: state.clientReducer.clientDetails || {},
  todos: state.logsReducer.logs && state.logsReducer.logs.docs || [],
  pagination: state.logsReducer.logs || {},
  loading: state.logsReducer.loading,
  selectedClient: state.clientReducer.clientDetails || {},  
});

export default connect(mapStateToProps, null)(withTranslation()(Activities));
