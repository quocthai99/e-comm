import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../../layouts/Header/Header";
import Navigation from "../../../layouts/Navigation/Navigation";
import Footer from "../../../layouts/Footer/Footer";

const Public = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
