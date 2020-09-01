import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h4>Hello</h4>
            <ul className="list-unstyled">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
          <div className="col-sm">
            <h4>Hello</h4>
            <ul className="list-unstyled">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
          <div className="col-sm">
            <h4>Hello</h4>
            <ul className="list-unstyled">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
          <div className="col-sm">
            <h4>Hello</h4>
            <ul className="list-unstyled">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-xs-center">
          &copy;{new Date().getFullYear()} Made By MM | All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
