import React, {useEffect,useState} from 'react'
import ClientContainerHeader from './client.header.component'
import ClientRecord from './client.record.component'
import './client.record.list.styles.scss'
import ClientTableHeader from './clients-table-header'
import Pagination from '../pagination/pagination'
function ClientList(){
    const [clients,setClients]=useState([])
    const [loading,setLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [clientsPerPage,setClientsPerPage]=useState(10)
    const paginate=(number)=>{
         setCurrentPage(number)
    }
    const next=()=>{
      
       setCurrentPage(currentPage+1)
    }
    const prev=()=>{
      if(currentPage===1){
        return
      }
      setCurrentPage(currentPage-1)
    }
    useEffect(()=>{
         setLoading(true)
        fetch('http://localhost:3001/api/v1/crm/clients')
        .then(result=>result.json())
        .then(data=>{
            setClients(data.result.docs);
            setLoading(false)
        })
    },[])
    const indexOfLastClient=currentPage*clientsPerPage
    const indexOfFirstClient=indexOfLastClient-clientsPerPage
    const currentClients=clients.slice(indexOfFirstClient,indexOfLastClient)
  return (
      <React.Fragment>
      <div  className="clients-container">
       <ClientContainerHeader/>
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
                     prev={prev}/> 
      </div>
      
      </React.Fragment>
  )
}
export default ClientList