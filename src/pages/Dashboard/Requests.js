import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle, Table
} from "reactstrap";
const RequestsStats = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>Requests</CardTitle>
          <CardSubtitle className="mb-3">
              Requests Stats
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
                  <th className="text-start" scope="row">ICO</th>
                  <td>10</td>
                  <td>8</td>
                  <td>20</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Promotions</th>
                  <td>5</td>
                  <td>6</td>
                  <td>44</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Coin Listing</th>
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

export default RequestsStats;