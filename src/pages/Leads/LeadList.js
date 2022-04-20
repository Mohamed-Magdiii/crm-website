import React, { useEffect, useState } from "react";
import { 
  useDispatch, useSelector, connect 
} from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { Search } from "react-bootstrap-table2-toolkit";
import "./LeadList.scss";
import { fetchLeadsStart } from "../../store/leads/actions";
import LeadForm from "pages/Leads/LeadAdd";


function LeadsList(props){
  const columns = [
    {
      dataField:"checkbox",
      text:<input type="checkbox"/>
    },
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (val) => {return new Date(val.createdAt).toLocaleDateString()}
    }, 
    {
      dataField:"name",
      text:"Name",
      formatter: (val) => {return  `${val.firstName} ${val.lastName}` },
    },
    {
      dataField: "email",
      text: "Email",
    
    },
    {
      dataField: "phone",
      text: "Phone",
    
    },
    {
      dataField: "language",
      text: "Language",
    
    },
    {
      dataField: "callStatus",
      text: "Status",
    
    },
    {
      dataField: "country",
      text: "Country",
  
    }, 
    {
      dataField:"agent",
      text:"Agent",
      formatter:(val)=>{return val.agent ? val.agent._id : "-" },
    },
    {
      dataField:"source",
      text:"Source"
    }];
 
    
  const {totalDocs} = useSelector(state=>state.leadReducer);
  const [sizePerPage, setSizePerPage] = useState(10);

  const dispatch = useDispatch();
  
  
  const { SearchBar } = Search;
  useEffect(()=>{
    loadLeads(1, sizePerPage);
  
  }, [sizePerPage, 1]);
  
  const loadLeads = ( currentPage, sizePerPage)=>{
    dispatch(fetchLeadsStart({
      sizePerPage,
      currentPage
    })) ;
  };
  
  return (
    <React.Fragment>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>Leads List</h2>
          <Row>
            <Col className="col-12">
              
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>Leads List ({totalDocs})</CardTitle>
                    <LeadForm/>
                  </div>
                  <div className="search-bar"> 
                    <SearchBar />
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
                          {!props.loading && props.leads.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              
                              {columns.map((column, index) =>
                                
                                
                                <Td key={`${rowIndex}-${index}`}>

                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
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
                        onChange={loadLeads}
                        docs={props.leads}
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
  loading: state.leadReducer.loading || false,
  leads: state.leadReducer.leads || [],
  page: state.leadReducer.page || 1,
  totalDocs: state.leadReducer.totalDocs || 0,
  totalPages: state.leadReducer.totalPages || 0,
  hasNextPage: state.leadReducer.hasNextPage,
  hasPrevPage: state.leadReducer.hasPrevPage,
  limit: state.leadReducer.limit,
  nextPage: state.leadReducer.nextPage,
  pagingCounter: state.leadReducer.pagingCounter,
  prevPage: state.leadReducer.prevPage,

});
export default connect(mapStateToProps, null)(LeadsList);
