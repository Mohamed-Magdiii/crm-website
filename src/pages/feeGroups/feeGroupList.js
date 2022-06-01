import React, { useEffect, useState } from "react";
import { 
  useDispatch,  connect 
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
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { fetchFeeGroupStart, deleteFeeGroupStart } from "store/feeGroups/actions";
import DeleteModal from "components/Common/DeleteModal";
import FeeGroupAdd from "./feeGroupAdd";
import FeeGroupEdit from "./feeGroupEdit";

function FeeGroupsList(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [editModal, setEditModal ] = useState(false);
  
  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox"/>
    },
    
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString()),
    }, 
    {
      dataField:"title",
      text : props.t("Title")
    },
    {
      dataField: "isPercentage",
      text: props.t("isPercentage"),
      formatter: (val) => (val.isPercentage ? "TRUE" : "FALSE"),
    },
    {
      dataField: "value",
      text:props.t("Value"),
    
    },
    {
      dataField: "maxValue",
      text:props.t("Max Value"),
    },
    {
      dataField: "minValue",
      text:props.t("Min Value"),
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
              onClick={() => {setEditModal(!editModal); setSelectedItem(item)}}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => {setDeleteModal(!deleteModal) ; setDeletedItem(item)}}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
 
  const [sizePerPage, setSizePerPage] = useState(10);

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    loadFeeGroups(1, sizePerPage);
  }, [sizePerPage, 1]);
  useEffect(()=>{
    if (!props.showEditSuccessMessage && editModal) {
      setEditModal(false);
      
    }
  }, [props.showEditSuccessMessage]);
  useEffect(()=>{
    if (!props.showDeleteModal && deleteModal) {
      setDeleteModal(false);
      
    }
  }, [props.showDeleteModal]);
  const loadFeeGroups = (page, limit) => {
    dispatch(fetchFeeGroupStart({
      page,
      limit
    }));
  };
  const deleteFeeGroup = ()=>{
    dispatch(deleteFeeGroupStart(deletedItem._id));
  };
  

  return (
    <React.Fragment>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>{props.t("Fee Groups")}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>{props.t("Fee Groups List")} ({props.totalDocs})</CardTitle>
                    <FeeGroupAdd/>
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
                        <Thead className="text-center">
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody className="text-center" style={{ fontSize: "13px" }}>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.feeGroups.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input  type="checkbox"/> : ""}
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
                        onChange={loadFeeGroups}
                        docs={props.feeGroups}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<FeeGroupEdit disabled= {props.editButtonDisabled} open ={editModal} selectedItem={selectedItem} onClose={()=>setEditModal(false)}/>}
          {<DeleteModal loading ={props.deleteLoading} show={deleteModal} onDeleteClick={deleteFeeGroup} onCloseClick={()=>setDeleteModal(false)}/>}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.feeGroupReducer.loading || false,
  feeGroups: state.feeGroupReducer.feeGroups || [],
  page: state.feeGroupReducer.page || 1,
  totalDocs: state.feeGroupReducer.totalDocs || 0,
  totalPages: state.feeGroupReducer.totalPages || 0,
  hasNextPage: state.feeGroupReducer.hasNextPage,
  hasPrevPage: state.feeGroupReducer.hasPrevPage,
  limit: state.feeGroupReducer.limit,
  nextPage: state.feeGroupReducer.nextPage,
  pagingCounter: state.feeGroupReducer.pagingCounter,
  prevPage: state.feeGroupReducer.prevPage,
  showEditSuccessMessage:state.feeGroupReducer.showEditSuccessMessage,
  showDeleteModal:state.feeGroupReducer.showDeleteModal,
  deleteLoading :state.feeGroupReducer.deleteLoading,
  editButtonDisabled: state.feeGroupReducer.editButtonDisabled
});

export default connect(mapStateToProps, null)(withTranslation()(FeeGroupsList));
