import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle, Table
} from "reactstrap";
const SalesTargetStats = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>SalesTarget</CardTitle>
          <CardSubtitle className="mb-3">
              Sales Target Stats
          </CardSubtitle>
          <div className="table-responsive">
            <Table className="table table-borderless mb-0">
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Money In Target</th>
                  <th>New Accounts</th>
                  <th>Money In</th>
                  <th>Money Out</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <th className="text-start" scope="row">Brad Pit</th>
                  <td>75,000 $</td>
                  <td>100</td>
                  <td>100,000 $</td>
                  <td>20,000 $</td>
                  <td>120 %</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Johnny Dep</th>
                  <td>175,000 $</td>
                  <td>1300</td>
                  <td>1400,000 $</td>
                  <td>220,000 $</td>
                  <td>150 %</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Brad Pit</th>
                  <td>75,000 $</td>
                  <td>100</td>
                  <td>100,000 $</td>
                  <td>20,000 $</td>
                  <td>120 %</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Johnny Dep</th>
                  <td>175,000 $</td>
                  <td>1300</td>
                  <td>1400,000 $</td>
                  <td>220,000 $</td>
                  <td>150 %</td>
                </tr>
                <tr>
                  <th className="text-start" scope="row">Brad Pit</th>
                  <td>75,000 $</td>
                  <td>100</td>
                  <td>100,000 $</td>
                  <td>20,000 $</td>
                  <td>120 %</td>
                </tr>
              </tbody>
            </Table>
          </div>
          
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SalesTargetStats;