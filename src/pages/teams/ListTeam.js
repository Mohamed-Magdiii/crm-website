
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
import { useDispatch, connect } from "react-redux";
import TableLoader from "./../../components/Common/TableLoader";
import CustomPagination from "components/Common/CustomPagination";
import { fetchTeamsStart } from "./../../store/teams/actions";
import AddTeams from "./AddTeams";

function ListTeam(props){

  const columns = [
    {
      dataField:"image",
      text:"Image",
      formatter:(val) =>  (<img style = {{ width:"50px" }} src ={`${process.env.REACT_APP_API_CRM_DOMAIN}/images/${val.image}`} alt= ""/>)
    },

    {
      dataField: "title",
      text: "Title-En",
      formatter: (val) =>  {return val.title?.en},

    },
    {
      dataField: "title",
      text: "Title-ar",
      formatter: (val) =>  {return val.title?.ar},

    },
    {
      dataField: "name",
      text: "Name-En",
      formatter: (val) => (val.name?.en),
    },
    {
      dataField: "name",
      text: "Name-Ar",
      formatter: (val) => (val.name?.ar),
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
              // onClick={() => { setEditModal(!editModal); setSelectedItem(item) }}
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
  const [lang, setLang] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [editModal, setEditModal] = useState(false); 
  const [sizePerPage, setSizePerPage] = useState(10);
  useEffect(()=>{
    setLang(localStorage.getItem("I18N_LANGUAGE")); 
  });
  useEffect(() => {
    loadTeams(1, sizePerPage);
  }, [sizePerPage, 1]);
  const loadTeams = (page, limit) => {
    dispatch(fetchTeamsStart({
      limit,
      page 
    }));
  };
  console.log(props.docs);
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          {"Products"}
        </title>    
      </MetaTags>
      <div className="page-content">
        <div className="container-fluid">
          <h2>{"Products"}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardTitle>{"Products"} ({props.totalDocs})</CardTitle>
                    <AddTeams />
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
                          {!props.loading && props.docs && props.docs.map((row, rowIndex) =>
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
                      {/* <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadProducts}
                        docs={props.docs}
                      /> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* {<ProductsEdit  open={editModal} selectedItem={selectedItem} onClose={() => setEditModal(false)} />} */}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.teams.loading,
  docs: state.teams.docs || [],
  page: state.teams.page || 1,
  totalDocs: state.teams.totalDocs || 0,
  totalPages: state.teams.totalPages || 0,
  hasNextPage: state.teams.hasNextPage,
  hasPrevPage: state.teams.hasPrevPage,
  limit: state.teams.limit,
  nextPage: state.teams.nextPage,
  pagingCounter: state.teams.pagingCounter,
  prevPage: state.teams.prevPage,
});
export default connect(mapStateToProps)(ListTeam);