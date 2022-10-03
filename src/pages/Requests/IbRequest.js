import { checkAllBoxes } from "common/utils/checkAllBoxes";
import TableLoader from "components/Common/Loader";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  Tbody, Td, Th, Thead, Tr 
} from "react-super-responsive-table";
import {
  Card, CardBody, CardHeader, CardTitle, Col, Row, Table 
} from "reactstrap";
const ibs = [
  {
    requestId : "RE39942075",
    date:  new Date(),
    client: "Test",
    kycStatus: "Approved",
    salesRep : "",
    status: "Approved"
  },
  // {
  //   requestId : "RE39942075",
  //   date:  new Date(),
  //   client: "Test",
  //   kycStatus: "Approved",
  //   salesRep : "",
  //   status: "Approved"
  // }
];
function IbRequest(props) {
  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox" id="check-all-fee-groups" onChange={()=>checkAllBoxes("check-all-fee-groups", ".fee-group-checkbox")}/>
    },
    
    {
      dataField: "requestId",
      text: props.t("Request Id"),
    //   formatter: (val) => (new Date(val.createdAt).toLocaleDateString()),
    }, 
    {
      dataField:"date",
      text : props.t("Date"),
      // formatter: (val) => (new Date(val.date).toLocaleDateString()),
    },
    {
      dataField: "client",
      text: props.t("Client"),
    },
    {
      dataField: "kycStatus",
      text:props.t("Kyc Status"),
    //   formatter: (val) => (val.value ? val.value.$numberDecimal : "")
    },
    {
      dataField: "salesRep",
      text:props.t("Sales Rep"),
      //   formatter: (val) => (val.minValue ? val.maxValue.$numberDecimal : "")
     
    },
    {
      dataField: "status",
      text:props.t("Status"),
    //   formatter: (val) => (val.minValue ? val.minValue.$numberDecimal : "")
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
    //   formatter: (item) => (
    //     <div className="d-flex gap-3">
    //       <Link className={`text-success ${!update ? "d-none" : ""}`} to="#">
    //         <i
    //           className="mdi mdi-pencil font-size-18"
    //           id="edittooltip"
    //           onClick={() => {setEditModal(!editModal); setSelectedItem(item)}}
    //         ></i>
    //       </Link>
    //       <Link className={`text-danger ${!deletePermission ? "d-none" : ""}`} to="#">
    //         <i
    //           className="mdi mdi-delete font-size-18"
    //           id="deletetooltip"
    //           onClick={() => {setDeleteModal(!deleteModal) ; setDeletedItem(item)}}
    //         ></i>
    //       </Link>
    //     </div>
    //   ),
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content"> 
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>{props.t("Partnership Requests")} </CardTitle>
                    {/* <FeeGroupAdd/> */}
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
                        className="table  table-hover "
                      >
                        <Thead className="text-center table-light" >
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody style = {{ fontSize : "13px" }}  >
                          {/* {props.loading && <TableLoader colSpan={4} />} */}
                          {ibs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`} className= "pt-4">
                                  { column.dataField === "checkbox" ? <input className = "deposit-checkbox" type="checkbox"/> : ""}
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  {/* {column.dataField === "dropdown" ? <CustomDropdown  permission={props.depositsPermissions.actions ? true : false}
                                    id={row._id} status={row.status} approve={()=>{depositApprove(row)}} reject={()=>{depositReject(row)}} /> : ""} */}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                      {/* <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadFeeGroups}
                        docs={props.feeGroups}
                      /> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* {<FeeGroupEdit disabled= {props.editButtonDisabled} open ={editModal} selectedItem={selectedItem} onClose={()=>setEditModal(false)}/>}
          {<DeleteModal loading ={props.deleteLoading} show={deleteModal} onDeleteClick={deleteFeeGroup} onCloseClick={()=>setDeleteModal(false)}/>} */}
        </div>
      </div>
    </React.Fragment>
  );
}


export default connect(null, null)(withTranslation()(IbRequest));