import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import ClientForm from "./ClientAdd";
import AddReminderToClientModal from "./AddReminderToClientModal";
import { fetchClientsStart } from "store/client/actions";
import "./ClientList.styles.scss";
import SearchBar from "components/Common/SearchBar";
import { Link } from "react-router-dom";

function ClientsList(props) {
  const [addModal, setAddReminderToClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const columns = [
    {
      dataField: "checkbox",
      text: <input type="checkbox" />
    },
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString())
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (val) => (`${val.firstName} ${val.lastName}`),
    },
    {
      dataField: "category",
      text: "type"
    },
    {
      dataField: "email",
      text: "Email",

    },
    {
      dataField: "phone",
      text: "Phone",

    },
    {
      dataField: "country",
      text: "country",

    },

    {
      dataField: "agent",
      text: "Agent",
      formatter: (val) => (val.agent ? val.agent._id : "-"),
    },
    {
      dataField: "source",
      text: "Source"
    },
    {
      dataField: "stages",
      text: "KYC",
      formatter: (val) => {
        if (val.stages) {
          const { kycApproved, kycRejected } = val.stages;
          if (kycApproved) {
            return "Approved";
          }
          if (kycRejected) {
            return "Rejected";
          }
          else {
            return "Pending";
          }
        }
        else {
          return "Pending";
        }
      }
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-calendar-text font-size-20"
              id="edittooltip"
              onClick={() => { console.log(user); setSelectedClient(user); setAddReminderToClientModal(true) }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchInputText, setSearchInputText] = useState("");
  const handleSearchInput = (e) => (setSearchInputText(e.target.value));
  const dispatch = useDispatch();

  useEffect(() => {
    loadClients(1, sizePerPage);
  }, [sizePerPage, 1, searchInputText]);

  const loadClients = (page, limit) => {
    if (searchInputText !== "" && searchInputText.length >= 3) {
      dispatch(fetchClientsStart({
        limit,
        page,
        searchText: searchInputText
      }));
    }
    else if (searchInputText === "") {
      dispatch(fetchClientsStart({
        limit,
        page
      }));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>Clients</h2>
          {<AddReminderToClientModal openAdd={addModal} selectedClient={selectedClient} onClose={() => { setAddReminderToClientModal(false) }} />}

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>Clients List ({props.totalDocs})</CardTitle>
                    <ClientForm />
                  </div>
                  <SearchBar handleSearchInput={handleSearchInput} />
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
                          {!props.loading && props.clients.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  {column.dataField === "checkbox" ? <input type="checkbox" /> : ""}
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
                        onChange={loadClients}
                        docs={props.clients}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    </React.Fragment>
  );

}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading || false,
  clients: state.clientReducer.clients || [],
  page: state.clientReducer.page || 1,
  totalDocs: state.clientReducer.totalDocs || 0,
  totalPages: state.clientReducer.totalPages || 0,
  hasNextPage: state.clientReducer.hasNextPage,
  hasPrevPage: state.clientReducer.hasPrevPage,
  limit: state.clientReducer.limit,
  nextPage: state.clientReducer.nextPage,
  pagingCounter: state.clientReducer.pagingCounter,
  prevPage: state.clientReducer.prevPage,

});
export default connect(mapStateToProps, null)(ClientsList);
