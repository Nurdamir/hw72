import React from 'react';
import Navbar from "../Navbar/Navbar";
import {useLocation} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
const location = useLocation();

  return (
    <>
      <header>
        {location.pathname !== '/' ? (<Navbar/>) : (
          <div className="navbar navbar-expand-sm navbar-dark bg-primary">
            <div className="container-fluid">
              <span className="navbar-brand">Turtle Pizza</span>
            </div>
          </div>)}
      </header>
      <main className="container-fluid">
        {children}
      </main>
    </>
  );
};

export default Layout;