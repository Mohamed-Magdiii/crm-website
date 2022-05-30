import React, { useState, useEffect} from "react";
import { useDispatch, connect } from "react-redux";
import {
  CardBody, Card, CardTitle, CardHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import CountriesAdd from "./CountriesAdd";
import TableLoader from "components/Common/TableLoader";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import DeleteModal from "components/Common/DeleteModal";
import CountriesEdit from "./CountriesEdit";
import { removeItem } from "store/dictionary/actions";
function CountriesTab(props){
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState();
  const [editModal, setEditModal] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const dispatch = useDispatch();
  useEffect(()=>{
    if (!props.editSuccess && editModal){
      setEditModal(false);
    }
  }, [props.editSuccess]);
  useEffect(()=>{
    if (props.clearDeleteModal && deleteModal){
      setDeleteModal(false);
    }
  }, [props.clearDeleteModal]);
  const columns = [
    {
      dataField:"alpha2",
      text:"Alpha2"
    }, 
    {
      dataField:"alpha3",
      text:"Alpha3"
    },
    {
      dataField:"callingCode",
      text:"Calling Code"
    },
    {
      dataField:"ar",
      text:"AR"
    },
    {
      dataField:"en",
      text:"EN"
    },
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => {
        
        return (
          <div className="d-flex gap-3">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => { setSelectedCountry(item); setEditModal(!editModal)}}
              ></i>
            </Link>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => {setDeleteModal(!deleteModal); setDeletedItem(item)}}
              ></i>
            </Link>
          </div>
        );
      }
    }
  ];
  function deleteCountry (){
    dispatch(removeItem(props.id, { "countries":{ ...deletedItem } }));
  }
  return (

    <React.Fragment>
    
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between  align-items-center">
            <CardTitle>Countries</CardTitle>
            <CountriesAdd/>
          </div>
               
        </CardHeader>
        <CardBody>
          <div className="table-rep-plugin">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <Table
                id="tech-companies-1"
                className="table "
              >
                <Thead>
                  <Tr>
                    {columns.map((column, index) =>
                      <Th data-priority={index} key={index}>{column.text}</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {props.loading && <TableLoader colSpan={4} />}
                  {!props.loading && props.countries.map((row, rowIndex) =>
                           
                    <Tr key={rowIndex}>
                      {columns.map((column, index) =>
                        <Td key={`${rowIndex}-${index}`}>
                                  
                          {column.formatter ? column.formatter(row, rowIndex) : row[column.dataField]}
                        </Td>
                      )}
                    </Tr>
                  )}
                </Tbody>
              </Table>
                    
            </div>
          </div>
        </CardBody>
      </Card>
      {<CountriesEdit open={editModal} country={selectedCountry} onClose={()=>setEditModal(false)}/>}
      {<DeleteModal show ={deleteModal} onDeleteClick={deleteCountry} onCloseClick={()=>setDeleteModal(false)}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || [],
  countries :state.dictionaryReducer.countries || [],
  id:state.dictionaryReducer.id,
  editSuccess:state.dictionaryReducer.editSuccess,
  deleteLoading:state.dictionaryReducer.deleteLoading,
  clearDeleteModal :state.dictionaryReducer.clearDeleteModal
});
export default connect(mapStateToProps, null)(CountriesTab);