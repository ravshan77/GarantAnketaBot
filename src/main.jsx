import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
// import "antd/dist/antd.min.css";
import { StyleProvider } from '@ant-design/cssinjs';
import ruRu from "antd/lib/locale/ru_RU";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./store";
import Loading from "./components/Loading/index";
import ErrorBoundary from '../ErrorBoundary';
// import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

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
