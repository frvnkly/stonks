import React from 'react';
import App, { Container } from 'next/app';
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Stonks</title>
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;