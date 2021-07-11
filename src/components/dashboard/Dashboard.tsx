import React, { FC } from 'react';

interface Props {
  logout: () => void;
}

const Dashboard: FC<Props> = ({ logout }) => {
  return (
    <div>
      dash
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboard;
