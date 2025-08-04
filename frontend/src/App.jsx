import { Provider } from "react-redux";
import store from "./store/appStore";
import AppRoutes from "./routes/AppRoutes";
import React from "react";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
