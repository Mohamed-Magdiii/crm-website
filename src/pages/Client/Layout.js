import React from "react";

import MainNavigation  from "./MainNavigation";

function Layout(props){
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <MainNavigation clientId={clientId} />
      <main>
        {props.children}  
      </main>
    </React.Fragment>
  );
}

export default Layout;