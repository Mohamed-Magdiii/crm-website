import React, {useEffect,useState} from 'react'
import ClientContainerHeader from './client.table.actions.component'
import ClientRecord from './client.record.component'
import './client.record.list.styles.scss'
import ClientTableHeader from './clients-table-header'
import Pagination from '../pagination/pagination'
import ClientContainerTitle from './client.container-title'
import ClientTableActions from './client.table.actions.component'
function ClientList(){
    const [clients,setClients]=useState([])
    const [loading,setLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [clientsPerPage,setClientsPerPage]=useState(10)
    
    const paginate=(number)=>{
         setCurrentPage(number)
    }
    console.log(clientsPerPage)
    const next=()=>{
      
       setCurrentPage(currentPage+1)
    }
    const changeClientsPerPage=(number)=>{
      setClientsPerPage(number)
    }
    useEffect(()=>{
         setLoading(true)
        fetch('http://localhost:3001/api/v1/crm/clients')
        .then(result=>result.json())
        .then(data=>{
            if(data.result.docs.length===0){
              
            }
            setClients(data.result.docs);
            setLoading(false)
        }).catch(error=>{
              
        })
    },[])
    const indexOfLastClient=currentPage*clientsPerPage
    const indexOfFirstClient=indexOfLastClient-clientsPerPage
    const currentClients=clients.slice(indexOfFirstClient,indexOfLastClient)
  return (
      <div  className="clients-container">

        <ClientContainerTitle/>
          <ClientTableActions clients={clients.length}/>
    
            {loading? 'loading':  <table className="client-table-content">
            <ClientTableHeader/>
             <tbody>
            {currentClients.map(client=>{
              return <ClientRecord key={client.id} client={client}/>
             })}
         </tbody>
       
        </table>}
        
         <Pagination clientsPerPage={clientsPerPage} 
                    totalClients={clients.length} 
                    paginate={paginate}
                     next={next}
                     changeClientsPerPage={changeClientsPerPage}
                     /> 
            
      </div>
      
    
  )
}
export default ClientList