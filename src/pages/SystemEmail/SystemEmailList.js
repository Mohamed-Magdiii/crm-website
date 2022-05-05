import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { fetchSystemEmails, deleteSystemEmail } from "../../store/systemEmail/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import SystemEmailAdd from "./SystemEmailAdd";
import SystemEmailEdit from "./SystemEmailEdit";

function SystemEmailsList(props){
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("list component"); // to control which component to render 
  const [selectedSystemEmail, setSelectedSystemEmail] = useState();
  
  // a callback function to pass to <SystemEmailAdd /> as a child to change activeComponent
  // and <SystemEmailEdit /> as a child to change activeComponent as well
  const switchComponents = () => {
    activeComponent === "list component" 
      ? setActiveComponent("edit component") 
      : setActiveComponent("list component");
  };

  // a function to switch status of a selected system email
  const switchSelectedSystemEmailStatusHandler = (selectedItem) => {
    selectedItem.isActive = !selectedItem.isActive;
  };

  const columns = [
    {
      dataField: "createdAt",
      text: "Created Date",
      formatter: (val) => {return new Date(val.createdAt).toDateString()}
    },
    {
      dataField: "createdBy",
      text: "Created By",
      formatter: (val) => {return (val.createdBy && val.createdBy.firstName) ? `${val.createdBy.firstName} ${val.createdBy.lastName}` : ""},
    },
    {
      dataField: "title",
      text: "Title"
    },
    {
      dataField: "action",
      text: "Action type"
    }, 
    {
      dataField:"content",
      text:"Default subject",
      formatter: (val) => {return val.content["en-gb"] && val.content["en-gb"].subject || " "}
    },
    {
      dataField: "isActive",
      text: "Status",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input 
            type="checkbox" 
            id={item.id} 
            switch="none" 
            defaultChecked={item.isActive} 
            onClick={() => { switchSelectedSystemEmailStatusHandler(item) }} />
          <Label className="me-1" htmlFor={item.id} data-on-label="Active" data-off-label=""></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Actions", 
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => { setSelectedSystemEmail(item); setActiveComponent("edit component") }}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => { setSelectedSystemEmail(item); setDeleteModal(true) }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  
  const [sizePerPage, setSizePerPage] = useState(5);
  const dispatch = useDispatch();
  const loadSystemEmailsFunction = (page, limit) => {
    dispatch(fetchSystemEmails({
      page,
      limit
    }));
  };
  const deleteSystemEmailFunction = () => {
    dispatch(deleteSystemEmail(selectedSystemEmail._id));
  };
  useEffect(()=>{
    loadSystemEmailsFunction(1, sizePerPage);
  }, [sizePerPage, 1]);
  useEffect(() => {
    if (props.deleteClearingCounter > 0 && deleteModal){
      setDeleteModal(false);
    }
  }, [props.deleteClearingCounter]);

  return (
    <React.Fragment>
      {activeComponent === "edit component" && <SystemEmailEdit role={selectedSystemEmail}  switchComponents={switchComponents} />}
      {activeComponent === "list component" && 
      <>
        <div className="page-content">
          <div className="container-fluid">
            <h2>System Emails</h2>
            <Row>
              <Col className="col-12">
                <Card>
                  <CardHeader className="d-flex justify-content-between  align-items-center">
                    <CardTitle>System Emails list ({props.totalDocs})</CardTitle>
                    <SystemEmailAdd switchComponents={switchComponents}/>
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
                            {!props.loading && props.docs.map((row, rowIndex) =>
                              <Tr key={rowIndex}>
                                {columns.map((column, index) =>
                                  <Td key={`${rowIndex}-${index}`}>
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
                          onChange={loadSystemEmailsFunction}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {<DeleteModal loading={props.deleteLoading} onDeleteClick={deleteSystemEmailFunction} show={deleteModal} onCloseClick={()=>{setDeleteModal(false)}} />}
          </div>
        </div>
      </>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.systemEmailsReducer.loading || false,
  docs: state.systemEmailsReducer.docs || [],
  page: state.systemEmailsReducer.page || 1,
  totalDocs: state.systemEmailsReducer.totalDocs || 0,
  totalPages: state.systemEmailsReducer.totalPages || 0,
  hasNextPage: state.systemEmailsReducer.hasNextPage,
  hasPrevPage: state.systemEmailsReducer.hasPrevPage,
  limit: state.systemEmailsReducer.limit,
  nextPage: state.systemEmailsReducer.nextPage,
  pagingCounter: state.systemEmailsReducer.pagingCounter,
  prevPage: state.systemEmailsReducer.prevPage,
  deleteLoading: state.systemEmailsReducer.deleteLoading,
  deleteClearingCounter: state.systemEmailsReducer.deleteClearingCounter,
  clearingCounter: state.systemEmailsReducer.clearingCounter,
  newDeleteRequest: state.systemEmailsReducer.newDeleteRequest
});

export default connect(mapStateToProps, null)(SystemEmailsList);
