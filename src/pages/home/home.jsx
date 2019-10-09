import React from "react";
import { Link } from "react-router-dom";
import imgSrc from "@/assets/img.jpg";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      this is Home page and you can&nbsp;
      <Link to="/detail">go Detail</Link>
      <br />
      <br />
      <img height="400px" src={imgSrc} />
      <br />
    </>
  );
}
