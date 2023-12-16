import React from "react";
import { Link, Outlet } from "react-router-dom";
import { deepMerge } from "@packages/shared/src/utils/deepMerge";

function App() {
  deepMerge();
  return (
    <div>
      <h1>ADMIN</h1>

      <Outlet />
    </div>
  );
}

export default App;
