import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store/appStore";
import AppRoutes from "./routes/AppRoutes";
import React from "react";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
