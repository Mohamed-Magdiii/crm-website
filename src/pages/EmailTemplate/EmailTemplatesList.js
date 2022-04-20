import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label,
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { fetchEmailTemplates, deleteEmailTemplate } from "../../store/emailTemplate/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import EmailTemplatesAdd from "./EmailTemplatesAdd";
import EmailTemplatesEdit from "./EmailTemplatesEdit";

function EmailTemplatesList(props){
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState();
  const columns = [
    {
      dataField: "createdAt",
      text: "Created Date",
      formatter: (val) => {return new Date(val.createdAt).toDateString()}
    }, 
    {
      dataField:"content",
      text:"Email content"
    },
    {
      dataField: "isActive",
      text: "Status",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input type="checkbox" id={item.id} switch="none" defaultChecked={item.isActive} onClick={() => {}} />
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
              onClick={() => {setSelectedEmailTemplate(item); setEditModal(true)}}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => { setSelectedEmailTemplate(item); setDeleteModal(true)}}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  const [sizePerPage, setSizePerPage] = useState(5);
  const dispatch = useDispatch();
  const loadEmailTemplatesFunction = (page, limit) => {
    dispatch(fetchEmailTemplates({
      page,
      limit,
    }));
  };
  useEffect(()=>{
    loadEmailTemplatesFunction(1, sizePerPage);
  }, [sizePerPage, 1]);
  const deleteEmailTemplateFunction = () => {
    dispatch(deleteEmailTemplate(selectedEmailTemplate._id));
  };

  // TODO delete modal needs to be handled here 
  // when to appear to disappear 

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Email templates</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Email templates list ({props.totalDocs})</CardTitle>
                  <EmailTemplatesAdd />
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
                        onChange={loadEmailTemplatesFunction}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<EmailTemplatesEdit open={editModal}  role={selectedEmailTemplate} onClose={()=>{setEditModal(false)}} />}
          {<DeleteModal loading={props.deleteLoading} onDeleteClick={deleteEmailTemplateFunction} show={deleteModal} onCloseClick={()=>{setDeleteModal(false)}} />}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.emailTemplatesReducer.loading || false,
  docs: state.emailTemplatesReducer.docs || [],
  page: state.emailTemplatesReducer.page || 1
});

export default connect(mapStateToProps, null)(EmailTemplatesList);
