"use client";

import React from "react";
import { Provider } from "react-redux";
import appStore from "@/app/lib/redux/store";

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={appStore}>{children}</Provider>;
}
