import "../shared/main.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./appRouter";
import { Provider } from "react-redux";
import { store } from "./appStore";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <>
    <Provider store={store}>
      <RouterProvider router={appRouter()} />
      <Toaster />
    </Provider>
  </>
);
