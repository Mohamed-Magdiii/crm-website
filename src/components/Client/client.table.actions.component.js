import './client.table.actions.styles.scss'
import FeatherIcon from "feather-icons-react";
function ClientTableActions(props){
  return (<div className="client-container-header">
    <div className="actions">
     <p>Contact List ({props.clients})</p>
     <button className="btn">+Add New </button>
    </div>
    <div className="input-box">
      <i className="fa fa-search icon"></i>
    <input className="search-input" placeholder="Search" type="text"/>
    </div>
    
    
    </div>)
}
export default ClientTableActions