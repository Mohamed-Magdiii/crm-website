import React, { useEffect, useState } from "react";
import {
  useDispatch, useSelector
} from "react-redux";
import { Link } from "react-router-dom";

import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Label
} from "reactstrap";

import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// import {
//   fetchOrders, deleteOrder,
// } from "store/Orders/actions";
import {
  fetchOrders, deleteOrder
} from "store/orders/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import OrdersAddModal from "./OrdersAddModal";

function OrderList(props) {
  const [deleteModal, setDeleteOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [clientId, setClientId] = useState(props?.clientId);

  console.log(props?.clientId);
  const {
    loading,
    docs,
    page,
    totalDocs,
    totalPages,
    hasNextPage,
    hasPrevPage,
    limit,
    nextPage,
    pagingCounter,
    prevPage,
    deleteLoading,
    deleteClearingCounter,
    // roles,
    clearingCounter,
    // editClearingCounter,
  } = useSelector((state) => ({
    loading: state.ordersReducer.loading || false,
    docs: state.ordersReducer.docs || [],
    page: state.ordersReducer.page || 1,
    totalDocs: state.ordersReducer.totalDocs || 0,
    totalPages: state.ordersReducer.totalPages || 0,
    hasNextPage: state.ordersReducer.hasNextPage,
    hasPrevPage: state.ordersReducer.hasPrevPage,
    limit: state.ordersReducer.limit,
    nextPage: state.ordersReducer.nextPage,
    pagingCounter: state.ordersReducer.pagingCounter,
    prevPage: state.ordersReducer.prevPage,
    deleteLoading: state.ordersReducer.deleteLoading,
    deleteClearingCounter: state.ordersReducer.deleteClearingCounter,
    // roles: state.ordersReducer.rolesData,
    clearingCounter: state.ordersReducer.clearingCounter,
    // editClearingCounter: state.ordersReducer.editClearingCounter,
  }));
  //   {
  //     "_id": "629ac4765a5660cbb85f9224",
  //     "symbol": "USDT/USDT",
  //     "type": "limit ",
  //     "side": "buy",
  //     "amount": 1,
  //     "tp": 1,
  //     "sl": 8,
  //     "price": 90,
  //     "customerId": "62725455a774aa41d4f07d9b",
  //     "id": "629ac4765a5660cbb85f9224"
  // }
  const columns = [
    {
      text: "symbol",
      dataField: "symbol",
      sort: true,
    },
    {
      text: "type",
      dataField: "type",
      sort: true,
    },
    {
      text: "side",
      dataField: "side",
      sort: true,
    },
    {
      text: "amount",
      dataField: "amount",
      sort: true,
    },
    {
      text: "tp",
      dataField: "tp",
      sort: true,
    },
    {
      text: "sl",
      dataField: "sl",
      sort: true,
    },
    {
      text: "price",
      dataField: "price",
      sort: true,
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (Order) => (
        <div className="d-flex gap-3">
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => { setSelectedOrder(Order); setDeleteOrderModal(true) }} ></i>
          </Link>
        </div>
      ),
    },
  ];
  const [sizePerPage, setSizePerPage] = useState(10);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [currentPage, setcurrentPagePage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    loadOrders(currentPage, sizePerPage);
  }, [sizePerPage, 1, clearingCounter]);

  const loadOrders = (page, limit) => {
    setcurrentPagePage(page);
    if (SearchInputValue !== "") {
      dispatch(fetchOrders({
        page,
        limit,
        searchText: SearchInputValue,
        customerId: clientId
      }));
    } else {
      dispatch(fetchOrders({
        page,
        limit,
        customerId: clientId
      }));
    }
  };
  const numPageRows = (numOfRows) => {
    setSizePerPage(numOfRows);
  };
  const deleteOrderHandel = () => {
    dispatch(deleteOrder(selectedOrder._id));
  };

  const searchHandelEnterClik = (event) => {
    if (event.keyCode === 13) {
      loadOrders(1, sizePerPage);
    }
  };
  useEffect(() => {
    if (deleteClearingCounter > 0 && deleteModal) {
      setDeleteOrderModal(false);
    }
  }, [deleteClearingCounter]);

  return (
    <React.Fragment>
      <div className="container-fluid"> 
        <Row>
          <Col className="col-12">
            <Card>
              <CardHeader className="d-flex justify-content-between  align-items-center">
                <CardTitle>
                  Orders List ({totalDocs})
                </CardTitle>
                <OrdersAddModal clientId={clientId} />
              </CardHeader>
              <CardBody>
                <div className="search-box me-2 mb-2 d-inline-block">
                  <div className="position-relative">
                    <label htmlFor="search-bar-0" className="search-label">
                      <span id="search-bar-0-label" className="sr-only">Search this table</span>
                      <input onChange={(e) => setSearchInputValue(e.target.value)} onKeyDown={(e) => searchHandelEnterClik(e)} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control " placeholder="Search" />
                    </label>
                    <i onClick={() => loadOrders(1, sizePerPage)} className="bx bx-search-alt search-icon" /></div>
                </div>
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
                        {loading && <TableLoader colSpan={6} />}
                        {!loading && docs.map((row, rowIndex) =>
                          <Tr key={rowIndex}>
                            {columns.map((column, index) =>
                              <Td key={`${rowIndex}-${index}`}>
                                {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                              </Td>
                            )}
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                    <CustomPagination
                      totalPages={totalPages}
                      docs={docs}
                      sizePerPage={sizePerPage}
                      page={page}
                      totalDocs={totalDocs}
                      hasNextPage={hasNextPage}
                      hasPrevPage={hasPrevPage}
                      prevPage={prevPage}
                      nextPage={nextPage}
                      limit={limit}
                      pagingCounter={pagingCounter}
                      setSizePerPage={numPageRows}
                      onChange={loadOrders}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {<DeleteModal loading={deleteLoading} onDeleteClick={deleteOrderHandel} show={deleteModal} onCloseClick={() => { setDeleteOrderModal(false) }} />}
      </div>
    </React.Fragment>
  );
}
export default OrderList;
