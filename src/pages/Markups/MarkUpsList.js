import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  UncontrolledAlert,
} from "reactstrap";
import { fetchMarkupsStart, deleteMarkupStart } from "store/markups/actions";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import TableLoader from "components/Common/TableLoader";
import CustomPagination from "components/Common/CustomPagination";
import { Link } from "react-router-dom";
import MarkupEdit from "./MarkupEdit";
import DeleteModal from "components/Common/DeleteModal";
import AddMarkup from "./AddMarkup";


function MarkUpsList(props) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [selectedMarkup, setSelectedMarkup] = useState();
  const t = props.t;
  const dispatch = useDispatch();

  const switchSelectedMarketHandler = (selectedItem, event) => {
    selectedItem[event.target.name] = !selectedItem[event.target.name];
  };

  const columns = [
    {
      dataField: "checkbox",
      text: <input type="checkbox" />,
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => new Date(val.createdAt).toLocaleDateString(),
    },
    {
      dataField: "title",
      text: props.t("Title"),
    },
    {
      dataField: "createdBy",
      text: props.t("Created By"),
      formatter: (val) => (`${val.createdBy.firstName} ${val.createdBy.lastName}`)
    },
    {
      dataField: "value",
      text: props.t("Value"),
    },
    {
      dataField: "isActive",
      text: props.t("isActive"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input
            type="checkbox"
            id={`{${item.id}}-isActive`}
            switch="none"
            name="isActive"
            disabled={true}
            defaultChecked={item.isActive}
            onClick={(event) => {
              switchSelectedMarketHandler(item, event);
            }}
          />
          <Label
            className="me-1"
            htmlFor={`{${item.id}}-isActive`}
            data-on-label={props.t("isActive")}
            data-off-label=""
          ></Label>
        </div>
      ),
    },
    {
      dataField: "isDefault",
      text: props.t("isDefault"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input
            type="checkbox"
            id={`{${item.id}}-isDefault`}
            switch="none"
            name="isDefault"
            disabled={true}
            defaultChecked={item.isDefault}
            onClick={(event) => {
              switchSelectedMarketHandler(item, event);
            }}
          />
          <Label
            className="me-1"
            htmlFor={`{${item.id}}-isDefault`}
            data-on-label={props.t("isDefault")}
            data-off-label=""
          ></Label>
        </div>
      ),
    },
    {
      dataField: "isPercentage",
      text: props.t("isPercentage"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input
            type="checkbox"
            id={`{${item.id}}-isPercentage`}
            switch="none"
            name="isPercentage"
            defaultChecked={item.isPercentage}
            onClick={(event) => {
              switchSelectedMarketHandler(item, event);
            }}
          />
          <Label
            className="me-1"
            htmlFor={`{${item.id}}-isPercentage`}
            data-on-label={props.t("isPercentage")}
            data-off-label=""
          ></Label>
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Action"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => {
                setSelectedMarkup(item);
                setEditModal(true);
              }}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => {
                setSelectedMarkup(item);
                setDeleteModal(true);
              }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    loadMarkups(1, sizePerPage);
  }, [sizePerPage, 1]);

  const loadMarkups = (page, limit) => {
    dispatch(
      fetchMarkupsStart({
        limit,
        page,
      })
    );
  };

  const deleteMarkup = () => {
    dispatch(deleteMarkupStart(selectedMarkup._id));
  };

  useEffect(() => {
    if (props.deleteModalClear && deleteModal) {
      setDeleteModal(false);
    }
  }, [props.deleteModalClear]);

  return (<>
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>{t("Markups")}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>
                      {props.t("Markups List")} ({props.totalDocs})
                    </CardTitle>
                    <AddMarkup></AddMarkup>
                  </div>
                </CardHeader>
                <CardBody>
                  {props.error ? <>
                    <UncontrolledAlert color="danger">
                      <i className="mdi mdi-block-helper me-2"></i>
                      {props.t(props.error)}
                    </UncontrolledAlert>
                  </> : <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table id="tech-companies-1" className="table ">
                        <Thead>
                          <Tr>
                            {columns.map((column, index) => (
                              <Th data-priority={index} key={index}>
                                {column.text}
                              </Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading &&
                            props.markups.map((row, rowIndex) => (
                              <Tr key={rowIndex}>
                                {columns.map((column, index) => (
                                  <Td key={`${rowIndex}-${index}`}>
                                    {column.dataField === "checkbox" ? (
                                      <input type="checkbox" />
                                    ) : (
                                      ""
                                    )}
                                    {column.formatter
                                      ? column.formatter(row, rowIndex)
                                      : row[column.dataField]}
                                  </Td>
                                ))}
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadMarkups}
                        docs={props.markups}
                      />
                    </div>
                  </div>}

                </CardBody>
              </Card>
            </Col>
          </Row>
          <MarkupEdit
            open={editModal}
            markup={selectedMarkup}
            onClose={() => setEditModal(false)}
          />
          <DeleteModal loading={props.deleteLoading} onDeleteClick={deleteMarkup} show={deleteModal} onCloseClick={() => setDeleteModal(false)} />
        </div>
      </div>
    </React.Fragment>
  </>);
}
const mapStateToProps = (state) => ({
  loading: state.markupsReducer.loading || false,
  markups: state.markupsReducer.markups || [],
  page: state.markupsReducer.page || 1,
  totalDocs: state.markupsReducer.totalDocs || 0,
  totalPages: state.markupsReducer.totalPages || 0,
  hasNextPage: state.markupsReducer.hasNextPage,
  hasPrevPage: state.markupsReducer.hasPrevPage,
  limit: state.markupsReducer.limit,
  nextPage: state.markupsReducer.nextPage,
  pagingCounter: state.markupsReducer.pagingCounter,
  prevPage: state.markupsReducer.prevPage,
  deleteLoading: state.markupsReducer.deleteLoading,
  deleteModalClear: state.markupsReducer.deleteModalClear,
  error: state.markupsReducer.error
});

export default connect(mapStateToProps, null)(withTranslation()(MarkUpsList));