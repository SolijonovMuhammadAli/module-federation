import { createBrowserRouter } from "react-router-dom";

import App from "../components/App";
import Shop from "../components/Shop";

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      { path: "/shop/main", element: <Shop /> },
      { path: "/shop/second", element: <div>second</div> },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
