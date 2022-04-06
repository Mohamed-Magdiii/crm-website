import './client.table.actions.styles.scss'
function ClientTableActions(props){
  return (<div className="client-container-header">
    <div className="actions">
     <p>Contact List ({props.clients})</p>
     <button className="btn">+Add New </button>
    </div>
    <input className="search-input" type="text"/>
    </div>)
}
export default ClientTableActions