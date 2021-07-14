import React from 'react';
import { PageHeader } from 'antd';
import { DashboardContext } from '../dashboard/Dashboard';

const Overview: React.FC = () => {
  const currentUser = React.useContext(DashboardContext).currentUser;

  return (
    <div>
      <PageHeader title="Overview" />
      <h1>Persona</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{`${currentUser.firstName} ${currentUser.lastName}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
