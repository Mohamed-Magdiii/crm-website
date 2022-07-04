
import React, { useRef } from "react";
import {
  AvField
} from "availity-reactstrap-validation";
import Select from "react-select";

function AvFieldSelecvt(props) {
  const ref1 = useRef();
  const [state, setState] = React.useState(null);
  const onFieldChange = (e) => {
    setState(e.value);
  };
  const { label, options = [], ...params } = props;

  // React.useEffect(()=>{
  //   setState(params.value);
  // }, [props]);
  return (<React.Fragment>
    <label>{label}</label>
    <Select
      ref={ref1}
      defaultValue={options.find(obj => obj.value === props.value) || {}}
      options={options} 
      onChange={onFieldChange}
    />
    <AvField
      {...params}
      type="select"
      value={state === null ? props.value : state}
      style={{
        opacity: 0,
        height: 0,
        margin: -10 
      }}
    >
      {options.map((obj, index) => {
        return (<option key={index} value={obj.value}>{obj.label}</option>);
      })}
    </AvField>
    

  </React.Fragment>);
}

export default AvFieldSelecvt;


// <Col md="3">
//     <div className="mb-6">
//     <label htmlFor="selectTitle">{props.t("Title")}</label>
//     {/* if selected title not loaded yet 
//         then it will render a select component with empty obj
//         when it's loaded it will be replaced with a select component
//         with selected title as its default value */}
//         {!selectedTitle && 
//             <Select
//                 defaultValue={{}}
//                 options={titleOptions} 
//                 onChange={titleChangeHandler}
//             />
//             }
//             {selectedTitle && 
//             <Select
//                 defaultValue={selectedTitle}
//                 options={titleOptions} 
//                 onChange={titleChangeHandler}
//             />
//             }
//             <AvField 
//             name="title"
//             type="text"
//             errorMessage={props.t("Title is required")}
//             validate={{ required: { value: true } }}
//             value={selectedTitle && selectedTitle.value}
//             style={{
//                 opacity: 0,
//                 height: 0,
//                 margin: -10 
//             }}
//             />
//         </div>
//         </Col>