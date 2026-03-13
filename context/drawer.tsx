"use client";

import { createContext, useContext } from "react";

const DrawerContext = createContext<() => void>(() => {});

export function useOpenDrawer() {
  return useContext(DrawerContext);
}

export default DrawerContext;
