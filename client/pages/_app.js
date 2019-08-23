// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import UserContext from '../context/UserContext';

class MyApp extends App {
  state = {
    user: null,
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    this.updateUser();
  }

  updateUser() {
    const currentUserEndpoint = '/auth/current_user';
    axios.get(currentUserEndpoint)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(res => {
        this.setState({ user: false });
      });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Stonks</title>
        </Head>
        <CssBaseline />
        <UserContext.Provider 
          value={{ user: this.state.user, updateUser: this.updateUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;