import React from 'react';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';


const Dashboard = () => {
  return <AdminLayout>
    <MetaData title={"Admin Dashboard"}/>
  </AdminLayout>;
};

export default Dashboard