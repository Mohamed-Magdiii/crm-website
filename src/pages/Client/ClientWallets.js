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
import { fetchClientWallet } from "store/client/actions";
import CustomPagination from "components/Common/CustomPagination";
import TableLoader from "components/Common/TableLoader";

function ClientWallets(props) {
  const clientId = props.clientId;
  const [sizePerPage, setSizePerPage] = useState(5);
  const dispatch = useDispatch();
  const loadClientWalletDetails = () => {
    dispatch(fetchClientWallet(clientId));
  };
  useEffect(() => {
    loadClientWalletDetails();
  }, []);

  const switchSelectedWalletStatus = (item) => {
    item.active = !item.active;
  };
  
  const columns = [
    {
      dataField: "asset",
      text: props.t("Asset")
    },
    {
      dataField: "amount",
      text: props.t("Amount"),
      formatter: (item) => (
        item.amount != " " ? "N/A" : item.amount
      )
    }, 
    {
      dataField: "isCrypto",
      text: props.t("Crypto"),
      formatter: (item) => (
        item.isCrypto ? "Crypto wallet" : "Traditional wallet"
      )
    },
    {
      dataField: "active",
      text: props.t("Active"),
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Input 
            type="checkbox" 
            id={item.id} 
            switch="none" 
            defaultChecked={item.active} 
            onClick={() => { switchSelectedWalletStatus(item) }} 
          />
          <Label className="me-1" htmlFor={item.id} data-on-label={props.t("Active")} data-off-label=""></Label>
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
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="d-flex justify-content-between  align-items-center">
                  <CardTitle>
                    {props.t("Transactions list")} ({props.totalWalletDocs})
                  </CardTitle>
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
                        {props.clientWalletDetails && <Tbody>
                          {props.loading && <TableLoader colSpan={4} />}
                          {!props.loading && props.clientWalletDetails.docs.map((row, rowIndex) =>
                            <Tr key={rowIndex}>
                              {columns.map((column, index) =>
                                <Td key={`${rowIndex}-${index}`}>
                                  { column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                                </Td>
                              )}
                            </Tr>
                          )}
                        </Tbody>}
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
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  error: state.clientReducer.error,
  errorDetails: state.clientReducer.errorDetails,
  success: state.clientReducer.success,
  clientWalletDetails: state.clientReducer.clientWalletDetails,
  totalWalletDocs: state.clientReducer.totalWalletDocs
});

export default connect(mapStateToProps, null)(withTranslation()(ClientWallets));
