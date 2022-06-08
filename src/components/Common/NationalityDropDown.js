import React from "react";
import { FormGroup } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";

function NationalityDropDown(){ 
  return (
    <React.Fragment>
    
      <FormGroup className="mb-3">

        <AvField type="select"
          name="nationality" 
          label="Nationality" 
          validate={{ required: { value: true } }} 
          errorMessage="Nationality is required">
          <option>Algeria</option>
          <option>Afghanistan</option>
          <option> Albania</option>     
          <option> Algeria</option>      
          <option> Andorra</option>      
          <option>Argentina</option>       
          <option>Armenia</option>
          <option> Australia</option>      
          <option>Austria</option>     
          <option>Bahrain</option>      
          <option> Bangladesh</option>   
          <option>USA</option> 
          <option> Baden</option> 
          <option>Bahrain</option> 
          <option> Bahrain</option>      
          <option> Bangladesh</option> 
          <option>Belarus</option>       
          <option> Belgium</option>        
          <option> East Germany (German Democratic Republic)*</option>
          <option> Ecuador</option> 
          <option> Egypt</option>     
          <option> El Salvador</option>  
          <option> Equatorial Guinea</option>     
          <option>Eritrea</option>        
          <option> Estonia</option>       
          <option> Eswatini</option>       
          <option>Ethiopia</option>        
         
        </AvField>      
      </FormGroup>
    </React.Fragment>);

}
export default NationalityDropDown;