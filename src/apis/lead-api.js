export const addNewLead = async(values) => {
  const result = await fetch("http://localhost:3001/api/v1/crm/leads", {
    method:"POST",
    mode:"cors",
         
    headers:{  
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({
      firstName:values.firstName,
      lastName:values.lastName,
      email:values.email,
      phone:values.phone,
      country:values.country,
      password:values.password
    })
  });
  const data = await result.json();
  return data;
};
export const fetchLeadsFromAPI = async ( { sizePerPage, currentPage })=>{
  
  const result = await  fetch(`http://localhost:3001/api/v1/crm/leads?limit=${sizePerPage}&page=${currentPage}`);
  const leads = await result.json();
  return leads;
};