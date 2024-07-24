import React from 'react';
import { AppProps } from 'next/app';
import { BrowserRouter as Router } from 'react-router-dom';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;
