// this is a parent to all system emails 
// it helps enhance performance 
// also it makes it a lot easier to switch from one system email component
// to the other with required data
// it can be considered the main component of system email
// just a component to control which component to render
import React, { useState } from "react";

import SystemEmailList from "./SystemEmailList";
import SystemEmailEdit from "./SystemEmailEdit";

function SystemEmails(){
  const [activeComponent, setActiveComponent] = useState("list component");
  // a callback function to pass to <SystemEmailAdd /> as a child to change activeComponent
  // and <SystemEmailEdit /> as a child to change activeComponent as well
  const switchActiveComponent = () => {
    activeComponent === "list component" 
      ? setActiveComponent("edit component") 
      : setActiveComponent("list component");
  };

  return (
    <React.Fragment>
      {activeComponent === "list component" && <SystemEmailList />}
      {activeComponent === "edit component" && <SystemEmailEdit switchComponents={switchActiveComponent}/>}
    </React.Fragment>
  );
}

export default SystemEmails;