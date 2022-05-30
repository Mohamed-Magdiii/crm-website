import React, { useEffect, useState } from "react";
import { 
  useDispatch,  connect 
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
import SearchBar from "components/Common/SearchBar";
import { withTranslation } from "react-i18next";
import { fetchFeeGroupStart } from "store/feeGroups/actions";
function FeeGroupsList(props) {

  const columns = [
    {
      dataField:"checkbox",
      text: <input type="checkbox"/>
    },
    {
      dataField: "createdAt",
      text: props.t("Date"),
      formatter: (val) => (new Date(val.createdAt).toLocaleDateString()),
    }, 
    {
      dataField: "isPercentage",
      text: props.t("isPercentage"),
      
    },
    {
      dataField: "value",
      text:props.t("Value"),
    
    },
    {
      dataField: "minValue",
      text:props.t("Min Value"),
    },
    {
      dataField: "maxValue",
      text:props.t("Max Value"),
    },
   
  ];
 
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchInputText, setSearchInputText] = useState("");
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    loadFeeGroups(1, sizePerPage);
  }, [sizePerPage, 1, searchInputText]);
  
  const loadFeeGroups = (page, limit) => {
    fetchFeeGroupStart({
      page,
      limit
    });
  };

  const handleSearchInput = (e) => (setSearchInputText(e.target.value));

  return (
    <React.Fragment>
      <div className="page-content"> 
        <div className="container-fluid">
          <h2>{props.t("Fee Groups List")}</h2>
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>{props.t("Fee Groups List")} ({props.totalDocs})</CardTitle>
                    
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
                          {!props.loading && props.feeGroups.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.dataField === "checkbox" ? <input type="checkbox"/> : ""}
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
                        onChange={loadFeeGroups}
                        docs={props.feeGroups}
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
  loading: state.feeGroupReducer.loading || false,
  feeGroups: state.feeGroupReducer.leads || [],
  page: state.feeGroupReducer.page || 1,
  totalDocs: state.feeGroupReducer.totalDocs || 0,
  totalPages: state.feeGroupReducer.totalPages || 0,
  hasNextPage: state.feeGroupReducer.hasNextPage,
  hasPrevPage: state.feeGroupReducer.hasPrevPage,
  limit: state.feeGroupReducer.limit,
  nextPage: state.feeGroupReducer.nextPage,
  pagingCounter: state.feeGroupReducer.pagingCounter,
  prevPage: state.feeGroupReducer.prevPage,
});

export default connect(mapStateToProps, null)(withTranslation()(FeeGroupsList));
