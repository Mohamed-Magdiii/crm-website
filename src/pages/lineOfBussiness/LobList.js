
import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { MetaTags } from "react-meta-tags";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";
import { fetchLOBStart } from "./../../store/lob/actions";
import { useDispatch, connect } from "react-redux";
import TableLoader from "./../../components/Common/TableLoader";
import CustomPagination from "components/Common/CustomPagination";
import LobEdit from "./LobEdit";
import LobAdd from "./LobAdd";

function LobList(props){
  const columns = [
    {
      dataField: "title",
      text: "Title-En",
      formatter: (val) =>  {return val.title.en},

    },
    {
      dataField: "title",
      text: "Title-Ar",
      formatter: (val) =>  {return val.title.ar},
  
    },
    {
      dataField: "description",
      text: "Description-En",
      formatter: (val) => (val.description.en),
    },
    {
      dataField: "description",
      text: "Description-Ar",
      formatter: (val) => (val.description.ar),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => (
        <div className="d-flex gap-3 justify-content-center">
          <Link className={"text-success"} to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => { setEditModal(!editModal); setSelectedItem(item) }}
            ></i>
          </Link>
          <Link className={"text-danger"} to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              //   onClick={() => { setDeleteModal(!deleteModal); setDeletedItem(item) }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState();
  const [editModal, setEditModal] = useState(false); 
  const [sizePerPage, setSizePerPage] = useState(10);

  useEffect(() => {
    loadLOB(1, sizePerPage);
  }, [sizePerPage, 1, props.editSuccess ]);
  const loadLOB = (page, limit) => {
    dispatch(fetchLOBStart({
      limit,
      page
    }));
  };
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          {"Line Of Bussiness"}
        </title>    
      </MetaTags>
      <div className="page-content">
        <div className="container-fluid">
          <h2>{"Line Of Bussiness"}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardTitle>{"Line Of Bussiness"} ({props.totalDocs})</CardTitle>
                    <LobAdd />
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
                        className="table table-hover "
                      >
                        <Thead className="text-center table-light" >
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody style={{
                          fontSize: "12px",
                          textAlign: "center",
                          textTransform: "capitalize"
                        }}>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  {/* {column.dataField === "checkbox" ? <input className="fee-group-checkbox" type="checkbox" /> : ""} */}
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
                        onChange={loadLOB}
                        docs={props.docs}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<LobEdit  open={editModal} selectedItem={selectedItem} onClose={() => setEditModal(false)} />}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.lob.loading,
  docs: state.lob.docs || [],
  page: state.lob.page || 1,
  totalDocs: state.lob.totalDocs || 0,
  totalPages: state.lob.totalPages || 0,
  hasNextPage: state.lob.hasNextPage,
  hasPrevPage: state.lob.hasPrevPage,
  limit: state.lob.limit,
  nextPage: state.lob.nextPage,
  pagingCounter: state.lob.pagingCounter,
  prevPage: state.lob.prevPage,
  editSuccess:state.lob.editSuccess
});
export default connect(mapStateToProps)(LobList);