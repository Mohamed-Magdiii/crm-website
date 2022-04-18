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
import "./emails.page.custom.styles.scss";
// modified from client to email template to fit the email template file
import { fetchEmailTemplateFromApi } from "../../store/emailTemplate/actions";

function EmailTemplateList(){
  const columns = [{
    dataField: "createdAt",
    text: "Register Date"
  }, 
  {
    dataField: "templateContent",
    text: "Email template content",
  },
  {
    dataField: "emailTemplateStatus", // active or inactive 
    text: "Template status",
  }, 
  {
    dataField: "actions", // update and delete buttons
    text: "Actions"
  }];
  
  // needs to be converted to bring all email templates instead of clients 
  // will get to it later on 
  // so work on modifying the clientReducer and the whole redux for the client 
  // maybe all these could be benefitial if converted to work with email templates
  // instead of clients 
  // but first I need to know how do they parse clients ? I can't see any for loops or iterations so how
  // do they do it ? I need to know to keep going
  // this is OK for now nothing seems to break so keep it this way until eventually you'll be 
  // faces with the logic and the data that's when you'll have to check them 
  const { emailTemplates } = useSelector(state=>state.emailTemplateReducer);
  // gonna use the same variable until they turn out to be misfits 
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // here with customizedClients we have name, createdAt and agent returned from each client object 
  const customizedEmailTemplates = emailTemplates.map(emailTemplate=>{
    const date = new Date(emailTemplate.createdAt);
  
    return {
      ...emailTemplate,
      activationEvent: emailTemplate.activationEvent,
      createdAt:date.toLocaleDateString(),
      emailTemplateStatus: emailTemplate.emailTemplateStatus,
      templateContent: emailTemplate.templateContent
    };
  });
    
  // use the same variables here again until they need to be modified or maybe totally removed 
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
    fetchEmailTemplateFromApi(dispatch, setTotalDocs, sizePerPage, currentPage);
  }, [currentPage, sizePerPage, dispatch]);
    
    
  return (
    <React.Fragment>
      <div className="page-content">
      
        <div className="container-fluid">
          <h2>Email templates list</h2>

          {/* this is the whole table */}
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Email templates List({totalDocs})</CardTitle>
                  <button className="add-btn">Add+</button>
                </CardHeader>
                <CardBody>
                
                  {/* pagination is supposed to be just another component
                      that controls the number of items per page in the UI */}
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={columns}
                    data={customizedEmailTemplates}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='id'
                        columns={columns}
                        data={customizedEmailTemplates}
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

                            {/* this row is for table headers */}
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

                            {/* this row is for the actual content let's see how it operates */}
                            <Row className="align-items-md-center mt-30">
                              <div className="p-2 border">
                                <Col className="pagination pagination-rounded gap-4 d-flex align-items-md-center" >
                                  <div className='custom-div'>
                                    <PaginationListStandalone 
                                      {...paginationProps }
                            
                                      onPageChange={(currentPage)=>{
                                  
                                        setCurrentPage(currentPage);
                                      }}
                                      page={currentPage}
                                    />
                                  </div>
                                  <div>Records:{emailTemplates.length}</div>
                                  <div >
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                      className="custom-background"
                                      onSizePerPageChange={(pageSize)=>{
                                        setSizePerPage(pageSize);
                                        setCurrentPage(1);}
                                      }
                                  
                                      page={currentPage}
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
export default EmailTemplateList;