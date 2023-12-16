import { createBrowserRouter, defer } from "react-router-dom";

import App from "../components/App";
import About from "../components/About";

const routes = [
  {
    path: "/admin",
    element: <App />,
    children: [{ path: "/admin/about", element: <About /> }],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
