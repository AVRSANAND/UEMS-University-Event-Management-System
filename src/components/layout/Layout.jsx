// Layout is used for displaying components which are always present in all pages. 
// Such as navbar and footer. 
// We use a props as children where other content will be displayed in the layout.  

import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
