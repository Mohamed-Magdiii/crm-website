import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, 
  CardTitle, CardHeader
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { fetchTodosStart, deleteTodosStart } from "store/actions";
import TodoAdd from "components/Common/TodoAdd";
import DeleteModal from "components/Common/DeleteModal";

function Todos(props) {
  const [sizePerPage, setSizePerPage] = useState(10);
  const [todoObj, setTodoObj] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      dataField: "recordId",
      text: props.t("ID")
    },
    {
      dataField: "note",
      text: props.t("Note")
    }, 
    {
      dataField: "createdBy",
      text: props.t("Posted By"),
      formatter:(val)=>(val.createdBy && val.createdBy.firstName  ? `${val.createdBy.firstName} ${val.createdBy.lastName}` : "")
    },
    {
      dataField: "createdAt",
      text: props.t("Date Created"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    },
    {
      dataField: "timeEnd",
      text: props.t("Time"),
      formatter: (val) => (new Date(val.timeEnd).toUTCString())
    }, 
    {
      dataField: "type",
      text: props.t("Type"),
      formatter: (val) => (val.type === 0 ? "Todo" : "Reminder")
    },
    // {
    //   dataField: "callStatus",
    //   text: props.t("Call Status"),
    
    // },
    {
      dataField: "status",
      text: props.t("Status"),
      
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Action"),
      formatter: (obj) => (
        <div className="">
          <Link className="p-2 text-success" to="#">
            <i
              className={"mdi mdi-pencil font-size-18"}
              id="edittooltip"
              onClick={() => { setTodoObj(obj); setShowModal(true) }}
            ></i>
          </Link>
          <Link className="p-2 text-danger" to="#">
            <i
              className={"mdi mdi-delete font-size-18"}
              id="deletetooltip"
              onClick={() => { setTodoObj(obj); setShowDeleteModal(true)}}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();
  const fetchData = async (page) => {
    dispatch(fetchTodosStart({
      page: page || 1,
      limit: sizePerPage,
      customerId: props.clientId,
    }));
  };

  useEffect(()=>{
    fetchData();
  }, []);
  useEffect(()=>{
    fetchData(1);
  }, [sizePerPage, 1]);

  const deleteRole = () => {
    dispatch(deleteTodosStart(todoObj._id));
  };

  useEffect(()=>{
    if (props.deletingClearCounter > 0 && showDeleteModal) {
      setShowDeleteModal(false);
    }
  }, [props.deletingClearCounter]);

  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Todos")} / {props.t("Reminders")}
                  </CardTitle>
                  <TodoAdd selectedClient={props.selectedClient} />
                  <TodoAdd
                    show={showModal} 
                    data={todoObj} 
                    onClose={() => { setShowModal(false) }}
                    hidenAddButton={true}
                  />
                  <DeleteModal
                    loading={props.deleteLoading}
                    onDeleteClick={deleteRole}
                    show={showDeleteModal }
                    onCloseClick={()=>{setShowDeleteModal(false)}}
                  />
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
                        <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}                            
                          {!props.loading && props.todos.length === 0 &&
                            <>
                              <Tr>
                                <Td colSpan={"100%"} className="fw-bolder text-center" st="true">
                                  <h3 className="fw-bolder text-center">No records</h3>
                                </Td>
                              </Tr>
                            </>
                          }
                          {!props.loading && props.todos.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`} className="text-center">
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                              
                      </Table>
                      <CustomPagination
                        {...props.pagination}
                        docs={props.todos}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={fetchData}
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
  clientDetails: state.clientReducer.clientDetails || {},
  todos: state.todosReducer.list && state.todosReducer.list.docs || [],
  pagination: state.todosReducer.list || {},
  loading: state.todosReducer.loading,
  selectedClient: state.clientReducer.clientDetails || {},
  deletingClearCounter: state.todosReducer.deletingClearCounter,
});

export default connect(mapStateToProps, null)(withTranslation()(Todos));
