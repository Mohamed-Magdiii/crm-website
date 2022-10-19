import React, { useEffect, useState } from "react";
import { 
  useDispatch, useSelector, connect 
} from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";

import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import "./LeadList.scss";
import { fetchLeadsStart } from "../../store/leads/actions";
import LeadForm from "pages/Leads/LeadAdd";
import SearchBar from "components/Common/SearchBar";
import { withTranslation } from "react-i18next";
import { captilazeFirstLetter } from "common/utils/manipulateString";
import { checkAllBoxes } from "common/utils/checkAllBoxes";
import { MetaTags } from "react-meta-tags";
function LeadsList(props) {

  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox" id="select-all-leads-checkbox" onChange={()=>{checkAllBoxes("select-all-leads-checkbox", ".leads-checkbox")}}/>
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString()),
    }, 
    {
      dataField: "name",
      text: props.t("Name"),
      formatter: (client) => (
        <div>
          <Link 
            to={{
              pathname: "/clients/" + client.id + "/profile",
              state: { clientId: client.id }
            }}
          >
            <strong className="text-capitalize">{client.firstName + " " + client.lastName}</strong>
          </Link>
        </div>
      )
    },
    {
      dataField: "email",
      text:props.t("Email"),
      formatter:(val)=>(captilazeFirstLetter(val.email))
    },
    {
      dataField: "phone",
      text:props.t("Phone"),
    },
    {
      dataField: "language",
      text:props.t("Language"),
      formatter : (val) => (captilazeFirstLetter(val.language))
    },
    {
      dataField: "callStatus",
      text:props.t("Status"),
      
    
    },
    {
      dataField: "country",
      text: props.t("Country"),
      formatter : (val)=>(captilazeFirstLetter(val.country))
    }, 
    {
      dataField: "agent",
      text:props.t("Agent"),
      formatter: (val) => (val.agent ? val.agent._id : "-"),
    },
    {
      dataField: "source",
      text:props.t("Source"),
    }
  ];
 
    
  const { totalDocs } = useSelector(state=>state.leadReducer);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchInputText, setSearchInputText] = useState("");
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    loadLeads(1, sizePerPage);
  }, [sizePerPage, 1, searchInputText]);
  
  const loadLeads = (page, limit) => {
    if (searchInputText !== "" && searchInputText.length >= 3){
      dispatch(fetchLeadsStart({
        limit,
        page,
        searchText:searchInputText
      }));
    }
    else if (searchInputText === ""){
      dispatch(fetchLeadsStart({
        limit,
        page
      }));
    }
  };

  const handleSearchInput = (e) => (setSearchInputText(e.target.value));

  return (
    <React.Fragment>      
      <MetaTags>
        <title>
          Leads
        </title>
      </MetaTags>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>{props.t("Leads List")}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>{props.t("Leads List")} ({totalDocs})</CardTitle>
                    <LeadForm/>
                  </div>
                  <div className="w-50">
                    <SearchBar handleSearchInput={handleSearchInput} />
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
                        <Thead className="text-center table-light">
                          <Tr>
                            {columns.map((column, index) =>
                              <Th data-priority={index} key={index}>{column.text}</Th>
                            )}
                          </Tr>
                        </Thead>
                        <Tbody className="text-center" style={{ fontSize : "13px" }}>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.leads.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input className="leads-checkbox" type="checkbox"/> : ""}
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
                        onChange={loadLeads}
                        docs={props.leads}
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
  loading: state.leadReducer.loading || false,
  leads: state.leadReducer.leads || [],
  page: state.leadReducer.page || 1,
  totalDocs: state.leadReducer.totalDocs || 0,
  totalPages: state.leadReducer.totalPages || 0,
  hasNextPage: state.leadReducer.hasNextPage,
  hasPrevPage: state.leadReducer.hasPrevPage,
  limit: state.leadReducer.limit,
  nextPage: state.leadReducer.nextPage,
  pagingCounter: state.leadReducer.pagingCounter,
  prevPage: state.leadReducer.prevPage,
});

export default connect(mapStateToProps, null)(withTranslation()(LeadsList));
