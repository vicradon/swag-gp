import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';
import { Router } from '@reach/router';
import { useDispatch } from 'react-redux';

import Layout from './Components/Layout';
import Settings from './Components/Settings';
import NotFound from './Components/NotFound';

import Dashboard from './Dashboard';
import Levels from './Levels';
import Profile from './Profile';

import customTheme from './utils/theme';
import { Auth0Provider, useAuth0 } from '../react-auth0-spa';
import onRedirectCallback from './utils/on_redirect_callback';

const ScrollToTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

const App = () => {
  const MainApp = () => {
    const { user, isAuthenticated, loading } = useAuth0();
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch({ type: 'FETCH_APP_STATE', payload: { loading, user, isAuthenticated } });
    });
    return (
      <Layout>
        <Router>
          <ScrollToTop path="/">
            <Dashboard path="/" />
            <Levels path="/levels" />
            <Profile path="/profile" />
            <Settings path="/settings" />
            <NotFound default />
          </ScrollToTop>
        </Router>
      </Layout>
    );
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <MainApp />
        </ColorModeProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default App;
