import './client.header.styles.scss'
function ClientContainerHeader(){
  return (<div className="client-container-header">
    <h2>Clients</h2>
    <div className="actions">
     <button className="btn">Add New Client</button>
    </div>
    </div>)
}
export default ClientContainerHeader