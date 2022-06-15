import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row, Col, Card, CardBody, CardTitle, CardHeader, Input, Label
} from "reactstrap";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientWallets } from "store/wallet/action";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";
import ClientAddWallet from "./ClientAddWallet";
import DeleteModal from "components/Common/DeleteModal";
import WalletEditModal from "./WalletEditModal";

function ClientWallets(props) {
  const clientId = props.clientId;
  const [sizePerPage, setSizePerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [walletEditModal, setWalletEditModal] = useState(false);
  const dispatch = useDispatch();
  const loadClientWalletDetails = () => {
    dispatch(fetchClientWallets(clientId));
  };
  useEffect(() => {
    loadClientWalletDetails();
  }, []);

  const switchSelectedWalletStatus = (item) => {
    item.active = !item.active;
  };
  
  const columns = [
    {
      dataField: "belongsTo",
      text: props.t("Belongs to"),
      formatter: (item) => (
        item.belongsTo.firstName + " " + item.belongsTo.lastName
      )
    },
    {
      dataField: "asset",
      text: props.t("Asset")
    },
    {
      dataField: "amount",
      text: props.t("Amount"),
      formatter: (item) => (
        item.amount === " " ? "N/A" : parseFloat(item.amount)
      )
    }, 
    {
      dataField: "isCrypto",
      text: props.t("Crypto"),
      formatter: (item) => (
        item.isCrypto ? props.t("Crypto wallet") : props.t("Traditional wallet")
      )
    },
    {
      dataField: "freezeAmount",
      text: props.t("Freeze amount"),
      formatter: (item) => (
        item.freezeAmount === " " ? "N/A" : parseFloat(item.freezeAmount) 
      )
    },
    {
      dataField: "active",
      text: props.t("Status"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input 
            type="checkbox" 
            id={item.id} 
            switch="none" 
            defaultChecked={item.active} 
            onClick={() => { switchSelectedWalletStatus(item) }} 
          />
          <Label 
            className="me-1" 
            htmlFor={item.id} 
            data-on-label={props.t("Active")} 
            data-off-label=""
          />
        </div>
      ),
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Actions"),
      formatter: () => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => {}}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => {}}
            ></i>
          </Link>
        </div>
      )
    }
  ];
  
  return (
    <React.Fragment>
      <div className="">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Client wallets list")} ({props.totalWalletDocs})
                  </CardTitle>
                  <ClientAddWallet clientId={clientId} />
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
                        {
                          props.totalWalletDocs === 0
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
                              {(!props.loading && props.docs) && props.docs.map((row, rowIndex) =>
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
                        {/* {props.docs && <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>} */}
                      </Table>
                      <CustomPagination
                        {...props}
                        setSizePerPage={setSizePerPage}
                        sizePerPage={sizePerPage}
                        onChange={loadClientWalletDetails}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<DeleteModal 
            loading={props.deleteLoading} 
            // onDeleteClick={deleteBankAccountFunction} 
            show={deleteModal} 
            onCloseClick={()=>{setDeleteModal(false)}} 
          />}
          {<WalletEditModal 
            open={walletEditModal}  
            // selectedBankAccount={selectedBankAccount} 
            onClose={()=>{setWalletEditModal(false)}} 
            // bankAccountUpdateHandler={bankAccountUpdateHanlder} 
          />}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.walletReducer.loading,
  error: state.walletReducer.error,
  errorDetails: state.walletReducer.errorDetails,
  success: state.walletReducer.success,
  docs: state.walletReducer.docs,
  totalWalletDocs: state.walletReducer.totalWalletDocs
});

export default connect(mapStateToProps, null)(withTranslation()(ClientWallets));
