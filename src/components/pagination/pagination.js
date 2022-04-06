import './pagination.styles.scss'
import Select from './select.component'
function Pagination({clientsPerPage,totalClients,paginate,next,changeClientsPerPage}){
    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalClients/clientsPerPage);i++){
        pageNumbers.push(i)
    }
   return(
       <div className="pagination-section">
        <ul className="pagination">
         
          {pageNumbers.map(number=>{
              return <li key={number} onClick={()=>paginate(number)} className="page-item">
                   {number}
              </li>
          })}
          <li onClick={next} className="page-item">{'>'}</li>
        </ul>
         <Select changeClientsPerPage={changeClientsPerPage}/>

       </div>
   )
}
export default Pagination