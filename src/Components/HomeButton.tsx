import React from "react";
import { Link } from "react-router-dom";
import { House } from "react-bootstrap-icons";

const HomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      className="d-flex align-items-center align-text-center justify-contents-center btn btn-primary"
    >
      <House />
      <p className="mb-0 ms-2">Home</p>
    </Link>
  );
};

export default HomeButton;
