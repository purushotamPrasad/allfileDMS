"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { ColorPalette } from "qssence-common";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SessionProviderWrapper from "@/Providers/SessionProviderWrapper";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { persistor, store } from "@/components/Redux/store";



// export const metadata: Metadata = {
//   title: "Qssence Web Admin",
//   description: "Web administration interface.",
// };


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <SessionProviderWrapper>
          <ThemeProvider theme={ColorPalette}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
