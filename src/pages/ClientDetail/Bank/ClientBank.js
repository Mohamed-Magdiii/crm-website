import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
// i18n
import { withTranslation } from "react-i18next";
import { 
  fetchClientBankAccount, 
  deleteBankAccount 
} from "store/bankAccount/actions";
import ClientAddBankAccountModal from "./ClientAddBankAccountModal";
import BankAccountEditModal from "./EditBankAccountModal";
import DeleteModal from "components/Common/DeleteModal";

function ClientBank(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const [sizePerPage, setSizePerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isBankAccountModified, setIsBankAccountModified] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState();
  const deleteBankAccountFunction = () => {
    dispatch(deleteBankAccount(selectedBankAccount._id));
  };
  const loadClientBankDetails = (page, limit) => {
    dispatch(fetchClientBankAccount({ 
      clientId: clientId,
      page,
      limit
    }));
  };
  const bankAccountUpdateHanlder = () => {
    setIsBankAccountModified(!isBankAccountModified);
  };
  useEffect(() => {
    loadClientBankDetails(1, sizePerPage);

  }, [sizePerPage, 1, props.deleteClearingCounter, isBankAccountModified, props.addClearingCounter]);
  useEffect(() => {
    if (props.deleteClearingCounter > 0 && deleteModal){
      setDeleteModal(false);
    }

  }, [props.deleteClearingCounter]);

  const columns = [
    {
      dataField: "bankName",
      text: props.t("Bank name")
    },
    {
      dataField: "accountHolderName",
      text: props.t("Owner")
    },
    {
      dataField: "swiftCode",
      text: props.t("Swift code")
    },
    {
      dataField: "iban",
      text: props.t("IBAN")
    }, 
    {
      dataField: "accountNumber",
      text: props.t("Account number")
    },
    {
      dataField: "currency",
      text: props.t("Currency")
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Actions"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => {setSelectedBankAccount(item); setEditModal(true)}}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => {setSelectedBankAccount(item); setDeleteModal(true)}}
            ></i>
          </Link>
        </div>
      )
    },
  ];

  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>{props.t("Bank accounts list")} ({props.totalDocs})</CardTitle>
                  <ClientAddBankAccountModal clientId={props.clientId} /> 
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
                        {/* if no data then show a table with a message no records
                            otherwise show data
                       */}
                        { props.totalDocs === 0 
                          ? 
                          <Tbody>
                            {props.loading && <TableLoader colSpan={4} />}                            
                            {!props.loading && /*props.totalDocs === 0 && */
                              <>
                                <Tr>
                                  <Td colSpan={"100%"} className="fw-bolder text-center" st>
                                    <h3 className="fw-bolder text-center">No records</h3>
                                  </Td>
                                </Tr>
                              </>
                            }
                          </Tbody>
                          :
                          <Tbody>
                            {props.loading && <TableLoader colSpan={4} />}
                            {!props.loading && props.clientBankAccounts.map((row, rowIndex) =>
                              <Tr key={rowIndex}>
                                {columns.map((column, index) =>
                                  <Td key={`${rowIndex}-${index}`}>
                                    { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                  </Td>
                                )}
                              </Tr>
                            )}
                          </Tbody>
                        }
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadClientBankDetails}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<DeleteModal 
            loading={props.deleteLoading} 
            onDeleteClick={deleteBankAccountFunction} 
            show={deleteModal} 
            onCloseClick={()=>{setDeleteModal(false)}} 
          />}
          {<BankAccountEditModal 
            open={editModal}  
            selectedBankAccount={selectedBankAccount} 
            onClose={()=>{setEditModal(false)}} 
            bankAccountUpdateHandler={bankAccountUpdateHanlder} 
          />}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.bankAccountReducer.loading || false,
  docs: state.bankAccountReducer.docs || [],
  page: state.bankAccountReducer.page || 1,
  totalDocs: state.bankAccountReducer.totalDocs || 0,
  totalPages: state.bankAccountReducer.totalPages || 0,
  hasNextPage: state.bankAccountReducer.hasNextPage,
  hasPrevPage: state.bankAccountReducer.hasPrevPage,
  limit: state.bankAccountReducer.limit,
  nextPage: state.bankAccountReducer.nextPage,
  pagingCounter: state.bankAccountReducer.pagingCounter,
  prevPage: state.bankAccountReducer.prevPage,
  clearingCounter: state.bankAccountReducer.clearingCounter,
  clientBankAccounts: state.bankAccountReducer.clientBankAccounts || [],
  deleteLoading: state.bankAccountReducer.deleteLoading,
  deleteClearingCounter: state.bankAccountReducer.deleteClearingCounter,
  addClearingCounter: state.bankAccountReducer.addClearingCounter
});

export default connect(mapStateToProps, null)(withTranslation()(ClientBank));
