import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';
import { Router } from '@reach/router';

import Layout from './Components/Layout';
import Settings from './Components/Settings';
import NotFound from './Components/NotFound';

import Dashboard from './Dashboard';
import SMEs from './SMEs';
import Profile from './Profile';

import customTheme from './utils/theme';


const ScrollToTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

const App = () => {
  const MainApp = () => (
    <Layout>
      <Router>
        <ScrollToTop path="/">
          <Dashboard path="/" />
          <SMEs path="/smes" />
          <Profile path="/profile" />
          <Settings path="/settings" />
          <NotFound default />
        </ScrollToTop>
      </Router>
    </Layout>
  );

  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
          <CSSReset />
          <MainApp />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
