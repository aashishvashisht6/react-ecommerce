import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My description",
  className = "ng-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead"> {description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container">
          <h4 className={className}>If you have any questions fell free to reach </h4>
          <div className="d-flex justify-centent-center">
          <button className="btn btn-warning btn-lg justify-content-center">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
