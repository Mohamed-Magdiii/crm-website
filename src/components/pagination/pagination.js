import './pagination.styles.scss'
function Pagination({clientsPerPage,totalClients,paginate,next,prev}){
    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalClients/clientsPerPage);i++){
        pageNumbers.push(i)
    }
   return(
       <div>
        <ul className="pagination">
          <li onClick={prev} className="page-item">prev</li>
          {pageNumbers.map(number=>{
              return <li key={number} onClick={()=>paginate(number)} className="page-item">
                   {number}
              </li>
          })}
          <li onClick={next} className="page-item">next</li>
        </ul>
       </div>
   )
}
export default Pagination