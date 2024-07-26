// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css'; // Certifique-se de que o caminho está correto

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
