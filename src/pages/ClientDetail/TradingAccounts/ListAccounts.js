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
import { Link } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { fetchTradingAccounts } from "store/actions";
import CreateTradingAccount from "components/Common/CreateTradingAccount";
import DeleteModal from "components/Common/DeleteModal";

function Accounts(props) {
  const [sizePerPage, setSizePerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      dataField: "recordId",
      text: props.t("ID")
    },
    {
      dataField: "login",
      text: props.t("Login")
    },
    {
      dataField: "accountTypeId",
      text: props.t("Account Type"),
      formatter: (val) => (val.accountTypeId && val.accountTypeId.title || "")
    },
    {
      dataField: "accountTypeId",
      text: props.t("Platform"),
      formatter: (val) => (val.accountTypeId && val.accountTypeId.platform || "")
    },
    {
      dataField: "accountTypeId",
      text: props.t("Type"),
      formatter: (val) => (val.accountTypeId && val.accountTypeId.type || "")
    },
    {
      dataField: "Equity",
      text: props.t("Equity"),
    },
    {
      dataField: "Balance",
      text: props.t("Balance"),
    }, 
    {
      dataField: "createdAt",
      text: props.t("Date Created"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    }
  ];

  const dispatch = useDispatch();
  const fetchData = async (page) => {
    dispatch(fetchTradingAccounts({
      page: page || 1,
      limit: sizePerPage,
      customerId: props.clientId,
    }));
  };

  //   useEffect(()=>{
  //     fetchData();
  //   }, []);
  useEffect(()=>{
    fetchData(1);
  }, [sizePerPage]);


  useEffect(()=>{
    if (props.deletingClearCounter > 0 && showDeleteModal) {
      setShowDeleteModal(false);
    }
  }, [props.deletingClearCounter]);
  
  console.log(props.loading);

  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Trading Accounts")}
                  </CardTitle>
                  <CreateTradingAccount
                    show={showModal} 
                    onClose={() => { setShowModal(false) }}
                    hidenAddButton={false}
                    customerId={props.clientId}
                  />
                  {/* <DeleteModal
                    loading={props.deleteLoading}
                    onDeleteClick={deleteRole}
                    show={showDeleteModal }
                    onCloseClick={()=>{setShowDeleteModal(false)}}
                  /> */}
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
                          {!props.loading && props.accounts.length === 0 &&
                            <>
                              <Tr>
                                <Td colSpan={"100%"} className="fw-bolder text-center" st="true">
                                  <h3 className="fw-bolder text-center">No records</h3>
                                </Td>
                              </Tr>
                            </>
                          }
                          {!props.loading && props.accounts.map((row, rowIndex) =>
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
                        docs={props.accounts}
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
  accounts: state.tradingAccountReducer.accounts && state.tradingAccountReducer.accounts.docs || [],
  pagination: state.tradingAccountReducer.accounts || {},
  loading: state.tradingAccountReducer.loading || false,
});

export default connect(mapStateToProps, null)(withTranslation()(Accounts));
