import { useEffect, useState } from "react";
import React from "react";
import {
  useDispatch, useSelector, connect
} from "react-redux";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, CardSubtitle
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { fetchRoles } from "../../store/roles/actions";

function RolesList(props){
  const columns = [
    {
      dataField: "createdAt",
      text: "Created Date",
    }, 
    {
      dataField:"title",
      text:"Title"
    }];
 
  const { leads } = useSelector(state=>state.leadReducer);
  const [sizePerPage, setSizePerPage] = useState(3);
  // const [totalDocs,setTotalDocs]=useState(props.totalDocs || 0)
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: props.totalDocs,
    custom: true,
  };
  
  const selectRow = {
    mode: "checkbox"
  };
  const { SearchBar } = Search;
  useEffect(()=>{
    dispatch(fetchRoles({
      page: currentPage,
      limit: sizePerPage
    }));
  }, [sizePerPage, currentPage]);
  return (
    <React.Fragment>
      <div className="page-content">
      
        <div className="container-fluid">
          <h2>Roles</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Roles List ({props.totalDocs})</CardTitle>
                  <button className="add-btn">Add+</button>
                </CardHeader>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={columns}
                    data={props.docs}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='id'
                        columns={columns}
                        data={props.docs}
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
                                  <div>Records:{props.docs.length}</div>
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


                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table table-striped "
                      >
                        <Thead>
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {props.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>{row[column.dataField]}</Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
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
// export default RolesList


const mapStateToProps = (state) => ({
  rolesReducer: state.rolesReducer,
  docs: state.rolesReducer.docs || [],
  page: state.rolesReducer.page || 1,
  totalDocs: state.rolesReducer.totalDocs || 0,
  totalPages: state.rolesReducer.totalPages || 0,
});
export default connect(mapStateToProps, null)(RolesList);
