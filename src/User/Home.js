import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="navbar navbar-expand-sm bg-light">
        <div className="container">
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="nav navbar-nav">
              <li><Link className="nav-link text-dark" to={"usevoucher"}>Use Voucher</Link></li>
              <li><Link className="nav-link text-dark" to={"listvoucher"}>List Voucher</Link></li>
              <li><Link className="nav-link text-dark" to={"buyvoucher"}>Buy Voucher</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet/>
    </React.Fragment>
  );
}

export default Home;
