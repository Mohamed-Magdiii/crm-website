
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
import { fetchProductsStart } from "./../../store/products/actions";
import ProductsAdd from "./ProductsAdd";
import ProductsEdit from "./ProductsEdit";
import CustomPagination from "components/Common/CustomPagination";

function ProductsList(props){

  const columns = [
    {
      dataField:"product",
      text:"LOB",
      formatter:(val) => {return  lang === "en" ?  val.product?.title?.en : val.product?.title?.ar}
    },
    {
      dataField: "title",
      text: "Title-En",
      formatter: (val) =>  {return val.title?.en},

    },
    {
      dataField: "title",
      text: "Title-En",
      formatter: (val) =>  {return val.title?.en},

    },
    {
      dataField: "title",
      text: "Title-Ar",
      formatter: (val) =>  {return val.title?.ar},
  
    },
    {
      dataField: "description",
      text: "Description-En",
      formatter: (val) => (val.description?.en),
    },
    {
      dataField: "description",
      text: "Description-Ar",
      formatter: (val) => (val.description?.ar),
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
  const [lang, setLang] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [editModal, setEditModal] = useState(false); 
  const [sizePerPage, setSizePerPage] = useState(10);
  useEffect(()=>{
    setLang(localStorage.getItem("I18N_LANGUAGE")); 
  });
  useEffect(() => {
    loadProducts(1, sizePerPage);
  }, [sizePerPage, 1]);
  const loadProducts = (page, limit) => {
    dispatch(fetchProductsStart({
      limit,
      page 
    }));
  };
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
                    <ProductsAdd />
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
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadProducts}
                        docs={props.docs}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<ProductsEdit  open={editModal} selectedItem={selectedItem} onClose={() => setEditModal(false)} />}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  docs: state.products.docs || [],
  page: state.products.page || 1,
  totalDocs: state.products.totalDocs || 0,
  totalPages: state.products.totalPages || 0,
  hasNextPage: state.products.hasNextPage,
  hasPrevPage: state.products.hasPrevPage,
  limit: state.products.limit,
  nextPage: state.products.nextPage,
  pagingCounter: state.products.pagingCounter,
  prevPage: state.products.prevPage,
});
export default connect(mapStateToProps)(ProductsList);