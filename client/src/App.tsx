import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Container } from '@material-ui/core';
import Header from './components/core/Header';
import GraphqlProvider from './components/core/GraphqlProvider';
import MainRouter from './components/core/MainRouter';
import { StoreProvider } from './store';
import theme from './constants/theme';
import './App.css';
import AuthContainer from 'containers/AuthContainer';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <GraphqlProvider>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Container maxWidth={false} style={{ display: 'flex', padding: 0, paddingTop: 64 }}>
            <Header />
            <MainRouter />
          </Container>
        </ThemeProvider>
      </GraphqlProvider>
    </StoreProvider>
  );
}

export default App;
