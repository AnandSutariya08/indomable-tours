import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { store, persistor } from "./store";
import App from "./App.tsx";
import "./index.css";

const AppBootFallback = () => (
  <div className="min-h-screen bg-[#FCF8F2] flex items-center justify-center px-6">
    <div className="w-full max-w-md">
      <div className="h-3 w-40 bg-black/10 rounded-full mb-4 animate-pulse" />
      <div className="h-12 w-full bg-black/10 rounded-xl mb-3 animate-pulse" />
      <div className="h-12 w-5/6 bg-black/10 rounded-xl animate-pulse" />
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<AppBootFallback />} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
