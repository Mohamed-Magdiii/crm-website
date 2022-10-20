
import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label, Spinner,
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  fetchIbs, fetchLeverages, ibRequestApprove, ibRequestReject, leverageRequestApprove, leverageRequestReject,
} from "store/requests/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import { captilazeFirstLetter } from "common/utils/manipulateString";
import CustomDropDown from "components/Common/CustomDropDown";

function Leverage(props){

  const columns = [
    {
      dataField: "recordId",
      text: "Request Id	",
    }, 
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (val) => {
        let d = new Date(val.createdAt);
        d = d.getDate()  + "-" + (d.getMonth() +  1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();
        return d;
      }
    }, 
    {
      dataField: "createdBy",
      text: "Created By",
      formatter: (val) => {return (val.createdBy && val.createdBy.firstName) ? `${captilazeFirstLetter(val.createdBy.firstName)} ${captilazeFirstLetter(val.createdBy.lastName)}` : ""},
    },
    {
      dataField:"customerId",
      text:"Client",
      formatter:(val)=> {return (val.customerId && val.customerId.firstName) ? `${captilazeFirstLetter(val.customerId.firstName)} ${captilazeFirstLetter(val.customerId.lastName)}` : ""}
    },
    {
      dataField:"content.login",
      text:"Trading account",
    },
    {
      dataField:"type",
      text:"Platform",
    },
    {
      dataField:"content.from",
      text:"Leverage",
    },
    {
      dataField:"content.to",
      text:"Requested Leverage",
    },
    {
      dataField:"type",
      text:"Sales Rep",
    },
    {
      dataField:"status",
      text:"Status",
      formatter: (user) => (
        <>
          {user.status === "PENDING"  ? (
            <div className="text-warning">
              {user.status}
            </div>
          ) : (user.status === "APPROVED" ? (
            <div className="text-warning">
              {user.status}
            </div>
          ) : <div className="text-warning">
            {user.status}
          </div> 
          )}
        </>

      ),
    },
    {
      dataField:"dropdown", 
      text:"Action"
    },
  ];
  const [sizePerPage, setSizePerPage] = useState(10);


  const dispatch = useDispatch();
  useEffect(()=>{
    loadLeverages(1, sizePerPage);
  }, [sizePerPage, 1, props.isApproveOrReject]);

  const loadLeverages = (page, limit) => {
    dispatch(fetchLeverages({
      page,
      limit,
    }));
  };

  const leverageApprove = (id)=>{
    dispatch(leverageRequestApprove(id));
  };
  const leverageRejected = (id)=>{
    dispatch(leverageRequestReject(id));
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Partnership</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>Partnership Requests ({props.totalDocs})</CardTitle>
              
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
                        <Tbody className="text-center" style={{ fontSize: "13px" }}>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {column.dataField === "dropdown" ? <CustomDropDown  permission={props.requestsPermissions.actions ? true : false} id={row._id} status={row.status} approve={()=>leverageApprove(row._id)} reject={()=>leverageRejected(row._id)} /> : ""}
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
                        onChange={loadLeverages}
                      />
                    </div>
                  </div>


                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* {<DeleteModal loading={props.deleteLoading} onDeleteClick={deleteRole} show={deleteModal } onCloseClick={()=>{setDeleteUserModal(false)}} />} */}
        </div>
      </div>
    </React.Fragment>
  );
}
// export default RolesList


const mapStateToProps = (state) => ({
  loading: state.requestReducer.loading || false,
  docs: state.requestReducer.docs || [],
  changeStatusLoading: state.requestReducer.changeStatusLoading,
  changeStatusLoadingIndex: state.requestReducer.changeStatusLoadingIndex,
  page: state.requestReducer.page || 1,
  totalDocs: state.requestReducer.totalDocs || 0,
  totalPages: state.requestReducer.totalPages || 0,
  hasNextPage: state.requestReducer.hasNextPage,
  hasPrevPage: state.requestReducer.hasPrevPage,
  limit: state.requestReducer.limit,
  nextPage: state.requestReducer.nextPage,
  pagingCounter: state.requestReducer.pagingCounter,
  prevPage: state.requestReducer.prevPage,
  deleteLoading: state.requestReducer.deleteLoading,
  deleteClearingCounter: state.requestReducer.deleteClearingCounter,
  requestsPermissions : state.Profile.requestsPermissions || {},
  isApproveOrReject: state.requestReducer.isApproveOrReject,
  // requestResponseMessage:state.depositReducer.depositResponseMessage

});
export default connect(mapStateToProps, null)(Leverage);
