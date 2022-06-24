import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Col
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import { Link } from "react-router-dom";
import {
  changeStatusDocStart
} from "store/documents/actions";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Select from "react-select";

import {
  AvForm, AvField,
} from "availity-reactstrap-validation";

// i18n 
import { withTranslation } from "react-i18next";
import TableLoader from "components/Common/TableLoader";

function DocumentApprove (props) {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState("");
  const options = [
    {
      label: "Approve",
      value: "APPROVED" 
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS" 
    },
    {
      label: "Reject",
      value: "REJECTED" 
    },
    {
      label: "Expired",
      value: "EXPIRED" 
    },
  ];
  const { customerId, documentId, index } = props;
  const approveDocument = (e, v) => {
    dispatch(changeStatusDocStart({
      documentId,
      customerId,
      ...v,
      status : status || props.status,
      index
    }));
  };

  useEffect(()=> {
    if (props.clearChangeStatus > 0) {
      props.onClose();
    }
  }, [props.clearChangeStatus]);

  return (<React.Fragment>
    <Modal isOpen={props.show} toggle={props.onClose} centered={true} size={"md"}>
      <ModalHeader toggle={props.onClose} tag="h4">
            Approve Document
      </ModalHeader>
      <ModalBody >
        <AvForm
          className='p-4'
          onValidSubmit={(e, v) => {
            approveDocument(e, v);
          }}
        >
          <Row className="mb-3">
            <Col sm={6}>
              <label>Change Status</label>

            </Col>
            <Col sm={6}>
              <Select 
                onChange={(e) => {
                  setStatus(e.value);
                }}
                defaultValue={options.find(obj => obj.value === (status || props.status)) || options[0]}
                options={options}
                classNamePrefix="select2-selection"
              />
            </Col>
          </Row>
          {(status || props.status) === "REJECTED" && <Row className="mb-3">
            <Col sm={6}>
              <label>Rejection Reason</label>

            </Col>
            <Col sm={6}>
              <AvField
                name="rejectionReason"
                placeholder="Enter Rejection Reason"
                type="text"
                errorMessage="Enter Rejection Reason"
                validate={{ required: { value: true } }}
              />
            </Col>
          </Row>}
          <div className='text-center pt-3 p-2'>
            <Button disabled={false} type="submit" color="primary" className="">
                Update
            </Button>
          </div>
        </AvForm>
      </ModalBody>
    </Modal>
  </React.Fragment>);
}

function DocumentListing(props) {
  const docs = props.documents.map(obj => {
    let arr = [obj.file1];
    if (obj.file2) {
      arr.push(obj.file2);
    }
    obj.files = arr;
    return obj;
  });

  const [approveModal, setApproveModal] = React.useState({
    show: false,
    documentId: null,
    clientId: null,
    status: "APPROVED"
  });
  
  const columns = [
    {
      dataField: "createdAt",
      text: "Created Date",
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    }, 
    {
      dataField:"type",
      text:"Type"
    },
    {
      dataField: "files",
      text: "Files",
      formatter: (val) => {
        return val.files.map(obj => obj.originalname).join(",");
      }
    },
    {
      dataField: "status",
      text: "Status"
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (val) => {
        return val.rejectionReason ? val.rejectionReason : "";
      }
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item, index) => (
        <div className="d-flex gap-3">
          {["PENDING", "EXPIRED"].indexOf(item.status) > -1  && <React.Fragment>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-sticker-remove-outline font-size-18"
                id="deletetooltip1"
                onClick={() => {
                  setApproveModal({
                    show: true,
                    customerId: item.customerId,
                    documentId: item._id,
                    status: "REJECTED",
                    index,
                    onClose: ()=> {setApproveModal({
                      ...approveModal,
                      show: false,
                    });}
                  });
                }}
              ></i>
            </Link>
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-check-bold font-size-18"
                id="deletetooltip2"
                onClick={() => {
                  setApproveModal({
                    show: true,
                    customerId: item.customerId,
                    documentId: item._id,
                    status: "APPROVED",
                    index,
                    onClose: ()=> {setApproveModal({
                      ...approveModal,
                      show: false,
                    });}
                  });
                }}
              ></i>
            </Link>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip3"
              //   onClick={() => { setSelectedRole(item); setDeleteUserModal(true)}}
              ></i>
            </Link>
          </React.Fragment>
          }
          {["PENDING", "EXPIRED"].indexOf(item.status) === -1 && <React.Fragment>----</React.Fragment>}
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <DocumentApprove {...approveModal} {...props}/>
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
                {!props.loading && docs.length === 0 &&  <Tr>
                  <Td colSpan={"100%"} className="fw-bolder text-center" st>
                    <h3 className="fw-bolder text-center">No records</h3>
                  </Td>
                </Tr> }
                {!props.loading && docs.map((row, rowIndex) =>
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
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.documentsReducer.loading,
  clearChangeStatus: state.documentsReducer.clearChangeStatus,
  documents: state.documentsReducer.documents,
  error: state.documentsReducer.error,
});

export default connect(mapStateToProps, null)(withTranslation()(DocumentListing));