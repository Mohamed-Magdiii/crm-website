import React, { useEffect, useState } from "react";
import { 
  useDispatch, connect 
} from "react-redux";
import { Link } from "react-router-dom";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { fetchAssestsStart, deleteSymbolStart } from "store/assests/actions";
import AssestForm from "./AssestAdd";
import AssestEdit from "./AssestEdit";
import DeleteModal from "components/Common/DeleteModal";
function AssestsList(props){
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox"/>
    },
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    }, 
    {
      dataField:"name",
      text:"Name",
      
    },
    {
      dataField:"symbol",
      text:"Symbol"
    },
    {
      dataField: "explorerLink",
      text: "Link",
    
    },
    {
      dataField: "minAmount",
      text: " Min deposit Amount",
      formatter:(val)=>(`${val.minAmount.deposit}`)
    },
    {
      dataField:"minAmount",
      text:"Min withdrawal Amount",
      formatter:(val)=>(`${val.minAmount.withdrawal}`)
    },
    
    {
      dataField: "fee",
      text: "Deposit Fee",
      formatter:(val) => (`${val.fee.deposit}`),
    },
    {
      dataField:"fee",
      text:"Withdrawal Fee",
      formatter:(val)=>(`${val.fee.withdrawal}`)
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={()=>{
                setSelectedSymbol(item) ;
                setEditModal(true);
              }}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={()=>{
                setSelectedSymbol(item);
                setDeleteModal(true);
              }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
 
  const [sizePerPage, setSizePerPage] = useState(10);
  
  const dispatch = useDispatch();
   
  useEffect(()=>{
    loadAssests(1, sizePerPage);
  }, [sizePerPage, 1]);
  
  const loadAssests = ( page, limit) => {
    dispatch(fetchAssestsStart({
      limit,
      page
    })) ;
  };
  const deleteSymbol = ()=>{
    console.log(selectedSymbol._id);
    dispatch(deleteSymbolStart(selectedSymbol._id));
  };
  useEffect(()=>{
    console.log(props.deleteLoading);
    if (props.deleteClearingCounter > 0 && deleteModal) {
      setDeleteModal(false);
    }
  }, [props.deleteClearingCounter]);
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Symbols</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>Symbols List ({props.totalDocs})</CardTitle>
                    <AssestForm/>
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
                          {!props.loading && props.assets.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
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
                        onChange={loadAssests}
                        docs={props.assests}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<AssestEdit open={editModal} symbol={selectedSymbol} onClose={()=>setEditModal(false)}/>}
          {<DeleteModal loading={props.deleteLoading} onDeleteClick = {deleteSymbol} show={deleteModal} symbol={selectedSymbol} onCloseClick={()=>setDeleteModal(false)}/>}
        </div>
      </div>
    </React.Fragment>
  );
  
}

const mapStateToProps = (state) => ({
  loading: state.assestReducer.loading || false,
  assets: state.assestReducer.assets || [],
  page: state.assestReducer.page || 1,
  totalDocs: state.assestReducer.totalDocs || 0,
  totalPages: state.assestReducer.totalPages || 0,
  hasNextPage: state.assestReducer.hasNextPage,
  hasPrevPage: state.assestReducer.hasPrevPage,
  limit: state.assestReducer.limit,
  nextPage: state.assestReducer.nextPage,
  pagingCounter: state.assestReducer.pagingCounter,
  prevPage: state.assestReducer.prevPage,
  deleteLoading:state.assestReducer.deleteLoading,
  deleteClearingCounter:state.assestReducer.deleteClearingCounter
});
export default connect(mapStateToProps, null)(AssestsList);
