import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "./lead.page.custom.styles.scss";
import { fetchLeadsFromAPI } from "../../store/leads/actions";
import LeadForm from "components/Add-Lead-Form/add.lead.form.component";
function LeadsList(){
  const columns = [{
    dataField: "createdAt",
    text: "Register Date",
    
  }, 
  {
    dataField:"name",
    text:"Name"
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
    text: "Call Status",
    
  },
  {
    dataField: "country",
    text: "Country",
  
  }, 
  {
    dataField:"agent",
    text:"Sales Agent" 
  },
  {
    dataField:"source",
    text:"Source"
  }];
 
    
  const { leads } = useSelector(state=>state.leadReducer);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const toggleAddLeadForm = ()=>{
    
    setShowAddForm(preValue=>!preValue);
    
  };
  const customizedLeads = leads.map(lead=>{
    const date = new Date(lead.createdAt);
  
    return {
      ...lead,
      name:`${lead.firstName} ${lead.lastName}`,
      createdAt:date.toLocaleDateString(),
      agent:lead.agent ? lead.agent._id : "-" 
    };
  });
    
  const dispatch = useDispatch();
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: totalDocs,
    custom: true,
  };
  
  const selectRow = {
    mode: "checkbox"
  };
  const { SearchBar } = Search;
  useEffect(()=>{
         
        
    fetchLeadsFromAPI(dispatch, setTotalDocs, sizePerPage, currentPage);
  }, [sizePerPage, currentPage, dispatch]);
  return (
    <React.Fragment>
      <div className="page-content">
        
        <div className="container-fluid">
          {showAddForm && <LeadForm/>}
          <h2>Leads</h2>
          
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Leads List ({totalDocs})</CardTitle>
                  <button className="add-btn" onClick = {toggleAddLeadForm}>Add+</button>
                </CardHeader>
                <CardBody>
                

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={columns}
                    data={customizedLeads}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='id'
                        columns={columns}
                        data={customizedLeads}
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>

                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      {...toolkitProps.searchProps}
                                    />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"id"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />

                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-md-center mt-30">
                              <div className="p-2 border">
                                <Col className="pagination pagination-rounded gap-4 d-flex align-items-md-center" >
                                  <div className='custom-div'>
                                    <PaginationListStandalone 
                                      {...paginationProps }
                                      onPageChange={(page)=>setCurrentPage(page)}
                                      page={currentPage}
                                    />
                                  </div>
                                  <div>Records:{leads.length}</div>
                                  <div >
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                      className="custom-background"
                                      onSizePerPageChange={(pageSize)=>
                                      {setSizePerPage(pageSize);
                                        setCurrentPage(1);
                                      }}
                                    />
                                  </div>
                              
                                </Col>
                              </div>
                            </Row>
                          </React.Fragment>
                        )
                        }
                      </ToolkitProvider>
                    )
                    }</PaginationProvider>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
export default LeadsList;
