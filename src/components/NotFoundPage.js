import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ marginLeft: "285px" }}>
      <h1>404 Not Found</h1>
      <Link to="/notes">Go home</Link>
    </div>
  );
}

export default NotFoundPage;
