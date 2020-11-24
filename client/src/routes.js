import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import UsersView from 'src/views/account/UsersView';
import CustomerListView from 'src/views/customer/CustomerListView';
import AdminListView from 'src/views/Admin/AdminListView';

import UpdateView from 'src/views/account/UpdateView';

const setUserAsProps = (user, cookies) => {
  // let navigate = useNavigate();
  return [
    {
      path: '/',
      element: <DashboardLayout user={user} cookies={cookies} />,
      children: [
        { path: 'profile', element: <AccountView user={user} /> },
        { path: 'update', element: <UpdateView user={user} /> },
        { path: 'discover', element: <CustomerListView /> },
        { path: 'admin', element: <AdminListView user={user} /> },
        { path: 'user/:id', element: <UsersView user={user} /> },
        { path: '/', element: <Navigate to="/discover" replace /> },
        { path: '*', element: <Navigate to="/discover" replace /> }
      ]
    }
  ];
};

export default setUserAsProps;
