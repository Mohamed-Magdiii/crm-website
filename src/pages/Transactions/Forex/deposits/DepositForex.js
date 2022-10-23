import React, {
  useState, useEffect
} from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import AddForexDepositModal from "./AddForexDepositModal";
import { fetchForexDeposits } from "store/forexTransactions/deposits/actions";
import SearchBar from "components/Common/SearchBar";
import CustomPagination from "components/Common/CustomPagination";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import TableLoader from "components/Common/TableLoader";
import Notification from "components/Common/Notification";
import logo from "../../../../assets/images/logo-sm.svg";
import { withTranslation } from "react-i18next";
import { checkAllBoxes } from "common/utils/checkAllBoxes";
import { Link } from "react-router-dom";
import { captilazeFirstLetter } from "common/utils/manipulateString";
import { fetchForexDepositsGatewaysStart } from "store/forexGateway/actions";
import CustomDropdown from "components/Common/CustomDropDown";
  
function DepositForex(props){
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [showNotication, setShowNotifaction] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox" id = "check-all-deposits" onChange = {()=>checkAllBoxes("check-all-deposits", ".deposit-checkbox")}/>
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => {
        let d = new Date(val.createdAt);
        d = d.getDate()  + "-" + (d.getMonth() +  1) + "-" + d.getFullYear() + " " +
          d.getHours() + ":" + d.getMinutes();
        return d;
      }
    },
    {
      dataField: "recordId",
      text: props.t("Transaction Id")
    },
    {
      dataField:"customerId",
      text:props.t("Client"),
      formatter:(val)=>{
        return (
          <div>
            <Link 
              to ={{
                pathname : `/clients/${val?.customerId?._id}/profile`,
                state : { clientId : val.customerId }
              }}>
              <spam className="no-italics" style={{ fontWeight: "bold" }}>{val.customerId ? `${captilazeFirstLetter(val.customerId.firstName)} ${captilazeFirstLetter(val.customerId.lastName)}` : ""}</spam>
            </Link>
          </div>
        );
      }
    },
    {
      dataField:"gateway",
      text:props.t("Payment Gateway"),
      formatter: (item) => (
        captilazeFirstLetter(item.gateway)
      )
    },
    {
      dataField: "tradingAccount",
      text: props.t("Trading Account"),
      formatter: (item) => (
        item.tradingAccountId?.login
      )
    },
    {
      dataField: "currency",
      text: props.t("Currency"),
    
    },
    {
      dataField: "bankReceipt",
      text: props.t("Bank Receipt"),
    },
    {
      dataField: "note",
      text: props.t("Note")
    },
    {
      dataField: "paid",
      text: props.t("paid")
    },
    {
      dataField: "fee",
      text: props.t("Fee")
    },
    {
      dataField: "amount",
      text: props.t("Amount")
    },
    {
      dataField: "salesRep",
      text: props.t("Sales Rep")
    },
    {
      dataField: "status",
      text: props.t("Status"),
      formatter:(item) => {
        return (
          item.status === "APPROVED" 
            ?
            <div>
              <spam className="no-italics text-success">{item.status}</spam>
            </div>
            :
            item.status === "PENDING"
              ?
              <div>
                <spam className="no-italics text-warning">{item.status}</spam>
              </div>
              :
              <div>
                <spam className="no-italics text-danger">{item.status}</spam>
              </div>
        );
      }
    },
    // {
    //   dataField: "",
    //   isDummyField: true,
    //   editable: false,
    //   text: props.t("Actions"),
    //   formatter: () => (
    //     <UncontrolledDropdown className={`"chat-noti-dropdown" ${!props.forexDepositsPermissions ? "d-none" : ""}`} >
    //       <DropdownToggle tag="i" className="text-muted" style={{ cursor: "pointer" }}>
    //         <i className="mdi mdi-dots-horizontal font-size-18" />
    //       </DropdownToggle>
    //       <DropdownMenu className="dropdown-menu-end">
    //         <DropdownItem href="#">{props.t("Approve")}</DropdownItem>
    //         <DropdownItem href="#">{props.t("Reject")}</DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   )
    // },
    {
      dataField: "dropdown",
      text:props.t("Actions")
    }
  ];

  const handleSearchInput = (e)=>{
    setSearchInput(e.target.value); 
  };

  const loadForexDeposits = (page, limit)=>{
    dispatch(fetchForexDeposits({
      limit, 
      page
    }));   
  };

  const loadForexGateways = ()=>{
    dispatch(fetchForexDepositsGatewaysStart());   
  };

  const closeNotifaction = () => {
    setShowNotifaction(false);
  };

  useEffect(()=>{
    loadForexDeposits(1, sizePerPage);
  }, [props.addLoading, sizePerPage, 1, searchInput, selectedFilter, props.depositResponseMessage]);

  useEffect(() => {
    loadForexGateways();
  }, []);

  return (
    <React.Fragment>
      <Notification
        onClose={closeNotifaction}
        body={props.t("The deposit has been updated successfully")}
        show={showNotication}
        header={props.t("Deposit Update")}
        logo={logo}
      />
      <Row>
        <Col className="col-12">
          <Card>
            <CardHeader className="d-flex flex-column gap-3 ">
              <div className="d-flex justify-content-between align-items-center">
                  
                <CardTitle>{props.t(`Deposits(${props.totalDocs})`)}</CardTitle>
                <AddForexDepositModal />
              </div>
                
              <div className="d-flex justify-content-between align-items-center">
                <SearchBar handleSearchInput={handleSearchInput} placeholder={props.t("Search for deposits")}/>
                <div>
                  <Dropdown
                    isOpen={btnprimary1}
                    toggle={() => setBtnprimary1(!btnprimary1)}
                  >
                    <DropdownToggle tag="button" className="btn btn-primary">
                      {selectedFilter} <i className="mdi mdi-chevron-down" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="ALL" onClick={(e)=>{setSelectedFilter(e.target.value)}}>All</DropdownItem>
                      <DropdownItem value="APPROVED" onClick={(e)=>{setSelectedFilter(e.target.value)}}>Approved</DropdownItem>
                      <DropdownItem value="REJECTED" onClick={(e)=>{setSelectedFilter(e.target.value)}}>Rejected</DropdownItem>
                      <DropdownItem value="PENDING" onClick={(e)=>{setSelectedFilter(e.target.value)}}>Pending</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
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
                    className="table  table-hover "
                  >
                    <Thead className="text-center table-light" >
                      <Tr>
                        {columns.map((column, index) =>
                          <Th data-priority={index} key={index}>{column.text}</Th>
                        )}
                      </Tr>
                    </Thead>
                      
                    {
                      props.totalDocs === 0
                        ?
                        <Tbody>
                          {props.fetchLoading && <TableLoader colSpan={4} />}                            
                          {!props.fetchLoading &&
                            <>
                              <Tr>
                                <Td colSpan={"100%"} className="fw-bolder text-center" st>
                                  <h3 className="fw-bolder text-center">No records</h3>
                                </Td>
                              </Tr>
                            </>
                          }
                        </Tbody>
                        :
                        <Tbody className="text-center" style={{ fontSize : "13px" }}>
                          {props.fetchLoading && <TableLoader colSpan={4} />}
                          {!props.fetchLoading && props.forexDeposits.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`} className= "pt-4">
                                  { column.dataField === "checkbox" ? <input className = "deposit-checkbox" type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  { column.dataField === "dropdown" ? <CustomDropdown  permission={props.depositsPermissions.actions ? true : false}
                                    id={row._id} status={row.status} /> : ""}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                    }
                  </Table>
                  <CustomPagination
                    {...props}
                    setSizePerPage={setSizePerPage}
                    sizePerPage={sizePerPage}
                    onChange={loadForexDeposits}
                    docs={props.forexDeposits}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
  
const mapStateToProps = (state) => ({
  fetchLoading: state.forexDepositReducer.fetchLoading || false,
  addLoading: state.forexDepositReducer.addLoading || false,
  forexDeposits: state.forexDepositReducer.forexDeposits || [],
  page: state.forexDepositReducer.page || 1,
  totalDocs: state.forexDepositReducer.forexTotalDocs || 0,
  totalPages: state.forexDepositReducer.totalPages || 0,
  hasNextPage: state.forexDepositReducer.hasNextPage,
  hasPrevPage: state.forexDepositReducer.hasPrevPage,
  limit: state.forexDepositReducer.limit,
  nextPage: state.forexDepositReducer.nextPage,
  pagingCounter: state.forexDepositReducer.pagingCounter,
  prevPage: state.forexDepositReducer.prevPage,
  depositsPermissions : state.Profile.depositsPermissions || {},
  depositResponseMessage:state.forexDepositReducer.depositResponseMessage,
  tradingAccounts: state.tradingAccountReducer.tradingAccounts,
  forexDepositsPermissions: state.Profile.forexDepositsPermissions || {},
});
export default connect(mapStateToProps, null)(withTranslation()(DepositForex));