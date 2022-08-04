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
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { fetchTransactionFeeGroupStart, deleteTransactionFeeGroupStart } from "store/transactionFeeGroups/actions";
import DeleteModal from "components/Common/DeleteModal";
import { fetchOrdersProfits } from "store/ordersProfit/actions";
import { fetchTransactionsProfitsStart } from "store/transactionsProfit/actions";


function TransactionProfitList(props) {
  const [deleteModal, setDeleteModal] = useState(false);

  const [sizePerPage, setSizePerPage] = useState(10);

  const dispatch = useDispatch();


  useEffect(() => {
    loadTransactionsProfits(1, sizePerPage);
  }, [sizePerPage, 1]);
  
  useEffect(() => {
    if (!props.showDeleteModal && deleteModal) {
      setDeleteModal(false);

    }
  }, [props.showDeleteModal]);
  const loadTransactionsProfits = (page, limit) => {
    dispatch(fetchTransactionsProfitsStart());
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h2>{props.t("Transactions Profit")}</h2>
          <Row>
            {props.transactionsProfits.map((transactionProfit, index)=><Col key={index} className="col-12">
              <Card>
                <CardHeader className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between  align-items-center">
                    <CardTitle>{props.t(transactionProfit.exchange)}</CardTitle>
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
                        <Tbody style={{ fontSize: "13px" }}>
                          {Object.keys(transactionProfit.balances).map((key, index) =>
                            <Tr key={index}>
                              <Td className="d-flex align-items-center justify-content-around">
                                <div>
                                  {key}
                                </div>
                                <div>
                                  {transactionProfit.balances[key]}
                                </div>
                              </Td>
                            </Tr>
                          )}
                      
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>)}    
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.transactionsProfitsReducer.loading || false,
  transactionsProfits: state.transactionsProfitsReducer.docs || [],
});

export default connect(mapStateToProps, null)(withTranslation()(TransactionProfitList));
