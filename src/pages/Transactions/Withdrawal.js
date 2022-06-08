import React, {
  useState, useEffect
} from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, CardHeader, CardTitle
} from "reactstrap";
import TableLoader from "components/Common/Loader";
import CustomPagination from "components/Common/CustomPagination";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import WithDrawForm from "./WithDrawForm";
import { 
  fetchWithdrawalsStart, withdrawApproveStart, withdrawRejectStart
} from "store/transactions/withdrawal/action";
import SearchBar from "components/Common/SearchBar";
import CustomDropdown from "components/Common/CustomDropDown";
import Notification from "components/Common/Notification";
import logo from "../../assets/images/logo-sm.svg";
import { withTranslation } from "react-i18next";
function Withdrawal(props){
  const dispatch = useDispatch();
  const [, setSearchInput] = useState("");
  const [sizePerPage, setSizePerPage] = useState(10);
  const [showNotication, setShowNotifaction] = useState(false);
  
  useEffect(()=>{
    loadWithdrawals(1, sizePerPage);
  }, [sizePerPage, 1]);
  
  const handleSearchInput = (e)=>{
  
    setSearchInput(e.target.value);
    
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
      dataField:"amount",
      text:props.t("Amount"),
      
    },
    
    
    {
      dataField: "dropdown",
      text:props.t("Action")
  
    },
  ];
  const loadWithdrawals = (page, limit)=>{
    dispatch(fetchWithdrawalsStart({
      page,
      limit
    }));
  };
  const withdrawApprove = (id)=>{
    dispatch(withdrawApproveStart(id));
    setShowNotifaction(true);
  };
  const withdrawReject = (id)=>{
    dispatch(withdrawRejectStart(id));
    setShowNotifaction(true);
  };
  const closeNotifaction = () => {
    setShowNotifaction(false);
  };
  return (

    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Notification onClose={closeNotifaction}
            body={props.t("The update of the withdraw has been made successfully")}
            show={showNotication}
            header={props.t("Withdraw update")}
            time={props.t("Now")}
            logo={logo}/>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardTitle>{props.t(`Withdrawals(${props.totalDocs})`)}</CardTitle>
                    <WithDrawForm />
                  </div>
                  
                  <SearchBar handleSearchInput={handleSearchInput} placeholder={props.t("Search for withdrawals")}/>
                      
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
                          {!props.loading && props.withdrawals.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {column.dataField === "dropdown" ? <CustomDropdown permission={props.withdrawalPermissions.actions ? true : false} id={row._id} status={row.status} approve={withdrawApprove} reject={withdrawReject}/> : ""}
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
                        onChange={loadWithdrawals}
                        docs={props.withdrawals}
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
const mapStateToProps = (state)=>({
  loading:state.withdrawalReducer.loading || false,
  withdrawals:state.withdrawalReducer.withdrawals || [],
  page: state.withdrawalReducer.page || 1,
  totalDocs: state.withdrawalReducer.totalDocs || 0,
  totalPages: state.withdrawalReducer.totalPages || 0,
  hasNextPage: state.withdrawalReducer.hasNextPage,
  hasPrevPage: state.withdrawalReducer.hasPrevPage,
  limit: state.withdrawalReducer.limit,
  nextPage: state.withdrawalReducer.nextPage,
  pagingCounter: state.withdrawalReducer.pagingCounter,
  prevPage: state.withdrawalReducer.prevPage,
  withdrawalPermissions: state.Profile.withdrawalPermissions || {}
}
);
export default connect(mapStateToProps, null)(withTranslation()(Withdrawal));