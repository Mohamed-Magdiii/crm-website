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
  const [selectedSystemEmailId, setSelectedSystemEmailId] = useState();

  // a callback function to pass to <SystemEmailAdd /> as a child to change activeComponent
  // and <SystemEmailEdit /> as a child to change activeComponent as well
  const switchActiveComponent = () => {
    activeComponent === "list component" 
      ? setActiveComponent("edit component") 
      : setActiveComponent("list component");
  };

  // a function to set selected item to edit
  const setSelectedSystemEmailIdFunction = (selectedSystemEmailId) => {
    setSelectedSystemEmailId(selectedSystemEmailId);
  };

  return (
    <React.Fragment>
      {activeComponent === "list component" && <SystemEmailList switchActiveComponent={switchActiveComponent} setSelectedSystemEmailIdFunction={setSelectedSystemEmailIdFunction} />}
      {activeComponent === "edit component" && <SystemEmailEdit switchActiveComponent={switchActiveComponent} setSelectedSystemEmailIdFunction={selectedSystemEmailId} />}
    </React.Fragment>
  );
}

export default SystemEmails;