import React from "react";
import { Link, Outlet } from "react-router-dom";
import { adminRouter } from "@packages/shared/src/routes/admin";
import { shopRouter } from "@packages/shared/src/routes/shop";

function App() {
  return (
    <div>
      <h1>HOST</h1>
      <br />
      <div>
        <Link to={adminRouter.about}>About</Link>
        <Link to={shopRouter.main}>Shop</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
