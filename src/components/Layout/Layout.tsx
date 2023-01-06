import React from 'react';
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {


  let admin = true;

  return (
    <>
      <header>
        {admin ? (<Navbar/>) : (
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