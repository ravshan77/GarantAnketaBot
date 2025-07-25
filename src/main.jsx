import App from './App';
import { Suspense } from 'react'
import { store } from "./store";
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import ruRu from "antd/lib/locale/ru_RU";
import ErrorBoundary from './ErrorBoundary';
import { persistStore } from "redux-persist";
import Loading from "./components/Loading/index";
import { StyleProvider } from '@ant-design/cssinjs';
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <ConfigProvider locale={ruRu}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider hashPriority="high">
              <App />
            </StyleProvider>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </Suspense>
  </ErrorBoundary>,
)