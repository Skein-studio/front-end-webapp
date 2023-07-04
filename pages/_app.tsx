// pages/_app.tsx

import React from "react";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
