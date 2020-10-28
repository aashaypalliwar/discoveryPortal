import React, { useState } from 'react';
import { useRoutes ,Switch,Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import DashboardLayout from 'src/layouts/DashboardLayout';
import Account from './../views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const Layout = ()=>{
    const routing = useRoutes(routes);
    return(
        <ThemeProvider theme={theme}>
          <GlobalStyles />
              {routing}
             
        </ThemeProvider>
    )
}

export default Layout;