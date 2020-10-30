import React, { useState } from 'react';
import { useRoutes, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import DashboardLayout from 'src/layouts/DashboardLayout';
import Account from './../views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import setUserAsProps from 'src/routes';
// import routes from 'src/routes';

const Layout = props => {
  //   const routing = useRoutes(() => {
  //     let routes = setUserAsProps(props);
  //     return routes;
  //   });
  const routes = setUserAsProps(props.user, props.cookies);
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default Layout;
