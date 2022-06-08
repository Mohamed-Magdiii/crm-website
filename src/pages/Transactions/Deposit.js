import React, {
  useState, useEffect
} from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, CardHeader, CardTitle
} from "reactstrap";

import AddDepositForm from "./AddDepositForm";
import {
  fetchDepositsStart, depositRejectStart, depositApproveStart  
} from "store/transactions/deposit/action";
import SearchBar from "components/Common/SearchBar";
import CustomPagination from "components/Common/CustomPagination";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import CustomDropdown from "components/Common/CustomDropDown";
import TableLoader from "components/Common/TableLoader";
import Notification from "components/Common/Notification";
import logo from "../../assets/images/logo-sm.svg";
import { withTranslation } from "react-i18next";
function Deposit(props){
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [showNotication, setShowNotifaction] = useState(false);
  
  
  const [sizePerPage, setSizePerPage] = useState(10);
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
      dataField:"dropdown", 
      text:props.t("Action")
    },
  ];
  
  useEffect(()=>{
    loadDeposits(1, sizePerPage);
  }, [sizePerPage, 1, searchInput]);
  
  const handleSearchInput = (e)=>{
  
    setSearchInput(e.target.value);
    
  };
  
  
  const loadDeposits = (page, limit)=>{
    
    dispatch(fetchDepositsStart({
      limit, 
      page
    }));
    
    
  };
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
  return (

    <React.Fragment>
     
      <div className="page-content">
        <div className="container-fluid">
          <Notification
            onClose={closeNotifaction}
            body={props.t("The deposit has been updated successfully")}
            show={showNotication}
            header={props.t("Deposit Update")}
            logo={logo}/>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3 ">
                  <div className="d-flex justify-content-between align-items-center">
                    
                    <CardTitle>{props.t(`Deposits(${props.totalDocs})`)}</CardTitle>
                    <AddDepositForm />
                  </div>
                  
                  <SearchBar handleSearchInput={handleSearchInput} placeholder={props.t("Search for deposits")}/>
                 
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
                          {!props.loading && props.deposits.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {column.dataField === "dropdown" ? <CustomDropdown  permission={props.depositsPermissions.actions ? true : false} id={row._id} status={row.status} approve={depositApprove} reject={depositReject} /> : ""}
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
                        onChange={loadDeposits}
                        docs={props.deposits}
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
  loading: state.depositReducer.loading || false,
  deposits: state.depositReducer.deposits || [],
  page: state.depositReducer.page || 1,
  totalDocs: state.depositReducer.totalDocs || 0,
  totalPages: state.depositReducer.totalPages || 0,
  hasNextPage: state.depositReducer.hasNextPage,
  hasPrevPage: state.depositReducer.hasPrevPage,
  limit: state.depositReducer.limit,
  nextPage: state.depositReducer.nextPage,
  pagingCounter: state.depositReducer.pagingCounter,
  prevPage: state.depositReducer.prevPage,
  depositsPermissions : state.Profile.depositsPermissions || {}
});
export default connect(mapStateToProps, null)(withTranslation()(Deposit));