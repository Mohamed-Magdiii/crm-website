
function ClientRecord({client}){
  const date=new Date(client.createdAt)
  let registerDate=date.toLocaleDateString()
  const {kycUpload,kycApproved,kycRejected}=client.stages
  function kycStatus(){
   
     if(kycApproved){
      return 'Approved'
    }
    else if(kycRejected){
      return 'Rejected'
    }
    else{
      return 'pending'
    }
  }
  return(
        <tr>
        <td><input type="checkbox"/> </td>
        <td >{registerDate}</td>
        <td >{`${client.firstName} ${client.lastName}`}</td>
        <td >{client.category}</td>
        <td >{client.email}</td>
        <td>{client.phone}</td>
        <td >sales agent</td>
        <td >{client.source} </td>
        <td >{kycStatus()} </td> 
        </tr>
     )
}
export default ClientRecord