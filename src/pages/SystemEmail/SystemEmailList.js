import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

// i18n
import { withTranslation } from "react-i18next";
import { fetchSystemEmails, deleteSystemEmail } from "../../store/systemEmail/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import SystemEmailAdd from "./SystemEmailAdd";
import SystemEmailEditModal from "./SystemEmailEditModal";
import SystemEmailHTMLPreviewModal from "./SystemEmailHTMLPreviewModal";

function SystemEmailsList(props){
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  // a state to change when updating a system email to force a reload to show new updates automatically
  const [isSystemEmailUpdated, setIsSystemEmailUpdated] = useState(false);
  const [selectedSystemEmail, setSelectedSystemEmail] = useState();

  // a callback function to pass to <SystemEmailEdit /> as a child to change emailUpdated to force 
  // a refresh on updating a system email 
  const systemEmailUpdatedHandler = () => {
    setIsSystemEmailUpdated(!isSystemEmailUpdated);
  };

  // a function to switch status of a selected system email
  const switchSelectedSystemEmailStatusHandler = (selectedItem) => {
    selectedItem.isActive = !selectedItem.isActive;
  };
  const { update, delete: deletePermission } = props.systemEmailsPermissions;
  const columns = [
    {
      dataField: "createdAt",
      text: props.t("Created date"),
      formatter: (val) => {return new Date(val.createdAt).toDateString()}
    },
    {
      dataField: "createdBy",
      text: props.t("Created by"),
      formatter: (val) => {return (val.createdBy && val.createdBy.firstName) ? `${val.createdBy.firstName} ${val.createdBy.lastName}` : ""},
    },
    {
      dataField: "title",
      text: props.t("Title"),
      formatter: (systemEmail) => (
        <div className="d-flex gap-3">
          <Link 
            to={{
              pathname: "/system-emails/" + systemEmail.id,
            }}
          >
            <i>{systemEmail.title}</i>
          </Link>
        </div>
      )
    },
    {
      dataField: "action",
      text: props.t("Action type")
    }, 
    {
      dataField: "content",
      text: props.t("Default subject"),
      formatter: (val) => {return val.content["en-gb"] && val.content["en-gb"].subject || " "}
    },
    {
      dataField: "isActive",
      text: props.t("Status"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input 
            type="checkbox" 
            id={item.id} 
            switch="none" 
            defaultChecked={item.isActive} 
            onClick={() => { switchSelectedSystemEmailStatusHandler(item) }} 
          />
          <Label className="me-1" htmlFor={item.id} data-on-label={props.t("Active")} data-off-label=""></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Preview"), 
      formatter: (item) => (
        <div className="d-flex gap-3 justify-content-center">
          <Link className={`text ${!update ? "d-none" : ""}`} to="#">
            <i
              className="mdi mdi-eye font-size-18"
              id="preview"
              onClick={() => {setSelectedSystemEmail(item); setPreviewModal(true)}}
            ></i>
          </Link>
        </div>
      )
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Actions"), 
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className={`text-success ${!update ? "d-none" : ""}`} to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => {setSelectedSystemEmail(item); setEditModal(true)}}
            ></i>
          </Link>
          <Link className={`text-danger ${!deletePermission ? "d-none" : "" }`} to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => { setSelectedSystemEmail(item); setDeleteModal(true)}}
            ></i>
          </Link>
        </div>
      )
    }
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
    // isSystemEmailUpdated is a state that's only used so to reload <SystemEmailList /> 
    // when a system email is updated showing any new updates 
    // the same logic applies for props.deleteClearingCounter
    // when a system email is deleted the page reloads pushing all system emails forward 
    // one step
  }, [sizePerPage, 1, isSystemEmailUpdated, props.deleteClearingCounter]);
  useEffect(() => {
    if (props.deleteClearingCounter > 0 && deleteModal){
      setDeleteModal(false);
    }
  }, [props.deleteClearingCounter]);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>{props.t("System emails")}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>{props.t("System emails list")} ({props.totalDocs})</CardTitle>
                  <SystemEmailAdd />
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
          {<SystemEmailEditModal 
            open={editModal}  
            role={selectedSystemEmail} 
            onClose={()=>{setEditModal(false)}} 
            systemEmailUpdatedHandler={systemEmailUpdatedHandler} 
          />}
          {<DeleteModal 
            loading={props.deleteLoading} 
            onDeleteClick={deleteSystemEmailFunction} 
            show={deleteModal} 
            onCloseClick={()=>{setDeleteModal(false)}} 
          />}
          {selectedSystemEmail && <SystemEmailHTMLPreviewModal 
            open={previewModal}
            role={selectedSystemEmail} 
            onClose={()=>{setPreviewModal(false)}}
          />}
        </div>
      </div>
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
  activeComponentProp: state.systemEmailsReducer.activeComponentProp,
  systemEmail: state.systemEmailsReducer.systemEmail,
  systemEmailsPermissions : state.Profile.systemEmailsPermissions || {}
});

SystemEmailsList.propTypes = {
  t: PropTypes.any
};

export default connect(mapStateToProps, null)(withTranslation()(SystemEmailsList));