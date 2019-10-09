import React from "react";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <>
      <h1>Detail</h1>
      this is Detail page and you can&nbsp;
      <Link to="/home">go Home</Link>
    </>
  );
}
