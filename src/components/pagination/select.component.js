function Select({changeClientsPerPage}){
    return(
    <select onChange={(event)=>changeClientsPerPage(event.target.value)} name="records-number" id="records-number">
    <option  value="10">10</option>
     <option value="20">20</option>
     <option value="30">30</option>
      <option value="40">40</option>
      <option value="70">60</option>
      <option value="80">80</option>
      <option value="100">100</option>
     </select>
    )
}
export default Select;