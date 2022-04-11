import React from 'react'
import { useEffect,useState } from 'react'
import { fetchClients ,fetchClientsSuccess} from '../../store/client/actions'
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col, Card, CardBody, CardTitle, CardHeader } from "reactstrap"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './clients.page.custom.styles.scss'


function ClientList(){
  const columns = [{
    dataField: 'createdAt',
    text: 'Register Date',
    
  }, 
  {dataField:'name',
  text:'Name'
},
  {
    dataField: 'category',
    text: 'type',
    
  }, {
    dataField: 'email',
    text: 'email',
    
  }, {
    dataField: 'phone',
    text: 'phone',
    
  }, {
    dataField: 'agent',
    text: 'agent',
    
  }, {
    dataField: 'source',
    text: 'source',
  
  }, 
  {
    dataField:'kyc',
    text:'KYC'
  }
   
  
  ];
  function kycStatus({kycApproved,kycRejected}){
   
    if(kycApproved){
     return 'Approved'
   }
   else if(kycRejected){
     return 'Rejected'
   }
   else{
     return 'pending'
   }
 }
    
    const {clients}=useSelector(state=>state.clientReducer)
    const [sizePerPage,setSizePerPage]=useState(10)
    const customizedClients=clients.map(client=>{
      const date=new Date(client.createdAt)
  
      return {...client,name:`${client.firstName} ${client.lastName}`,
                createdAt:date.toLocaleDateString(),
                agent:client.agent?client.agent._id:'-',
              kyc:kycStatus(client.stages)}
    })
    
    const dispatch=useDispatch()
    const pageOptions = {
      sizePerPage: sizePerPage,
      totalSize: clients.length,
      custom: true,
    }
  
    const selectRow = {
      mode: 'checkbox'
    }
    const { SearchBar } = Search;

    useEffect(()=>{
         
        fetch('http://localhost:3001/api/v1/crm/clients')
        .then(result=>result.json())
        .then(data=>{
            dispatch(fetchClients(data.result.docs))
            dispatch(fetchClientsSuccess(false))
        }).catch(error=>{
              dispatch(error)
        })
    },[])
   return(
    <React.Fragment>
    <div className="page-content">
      
      <div className="container-fluid">
        <h2>Clients</h2>

        <Row>
          <Col className="col-12">
            <Card>
              <CardHeader className="d-flex justify-content-between  align-items-center">
                 <CardTitle>Clients List({clients.length})</CardTitle>
                  <button className="add-btn">Add+</button>
              </CardHeader>
              <CardBody>
                

                <PaginationProvider
                  pagination={paginationFactory(pageOptions)}
                  keyField='id'
                  columns={columns}
                  data={customizedClients}
                >
                  {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                      keyField='id'
                      columns={columns}
                      data={customizedClients}
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
                              
                            />
                              </div>
                              <div>Records:{pageOptions.sizePerPage}</div>
                              <div >
                                <SizePerPageDropdownStandalone
                                  {...paginationProps}
                                  className="custom-background"
                                  onSizePerPageChange={(pageSize)=>setSizePerPage(pageSize)}
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
   )
}
export default ClientList