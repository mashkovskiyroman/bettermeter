import React from "react";
import App from "next/app";
import Head from "next/head";
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/index.css';

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};

  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <>
        <Head>
          <title>BetterMeter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" key="viewport"/>
          <meta property="og:title" content="BetterMeter" />
          <meta property="og:description" content="BetterMeter" />
          <link rel='icon' href='../static/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
