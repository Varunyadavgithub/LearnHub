import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.js";
import { Toaster } from "sonner";
import { useLoadUserQuery } from "./app/features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";

const CustomLoader = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner /> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomLoader>
        <App />
        <Toaster />
      </CustomLoader>
    </Provider>
  </StrictMode>
);
