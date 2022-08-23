import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle, Table
} from "reactstrap";
const TransactionsStats = () => {
  return (
    <React.Fragment>
      <Card className="card-animate">
        <CardBody>
          <CardTitle>Transactions</CardTitle>
          <CardSubtitle className="mb-3">
              Transactions Stats
          </CardSubtitle>
          <div className="table-responsive">
            <Table className="table table-borderless mb-0">
              <thead>
                <tr className="text-center">
                  <th></th>
                  <th>Pending</th>
                  <th>Rejected</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <th className="text-start" scope="row">Deposits</th>
                  <td>10</td>
                  <td>8</td>
                  <td>20</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Withdrwals</th>
                  <td>5</td>
                  <td>6</td>
                  <td>44</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Converts</th>
                  <td>12</td>
                  <td>44</td>
                  <td>3</td>
                </tr>
              </tbody>
            </Table>
          </div>
          
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TransactionsStats;