"use client";

import React from "react";
import LoginScreen from "../../components/LoadingScreen";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  const [loading] = React.useState<boolean>(false);

  // const startLoading = () => {
  //   setLoading(true);
  // };

  // const stopLoading = () => {
  //   setLoading(false);
  // };

  // const value = {
  //   startLoading: startLoading,
  //   stopLoading: stopLoading,
  //   loading,
  // };

  return (
    <>
      {loading && <LoginScreen loading={loading} />}
      {children}
    </>
  );
}
