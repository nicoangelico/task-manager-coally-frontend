"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storePersist from "../redux/store";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={storePersist.store}>
      <PersistGate loading={null} persistor={storePersist.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
