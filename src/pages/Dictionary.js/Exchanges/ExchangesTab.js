import React, {useState} from "react";

import {useDispatch, connect} from "react-redux";
import {
  CardBody, CardHeader, Card, CardTitle
} from "reactstrap";

import { Link } from "react-router-dom";
import ExchangeAddModal from "./ExchangeAddModal";
import DeleteModal from "components/Common/DeleteModal";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import TableLoader from "components/Common/TableLoader";
import ExchangeEdit from "./ExchangeEdit";
import { removeItem } from "store/dictionary/actions";
function ExchangesTab(props){ 
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState();
  const [selectedExchange, setSelectedExchange] = useState();
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  let columns = [
    {
      dataField:"exchanges",
      text:"Exchanges"
    }, 
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item ) => {
        
        return (
          <div className="d-flex gap-3">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => {setSelectedExchange(item); setEditModal(!editModal)}}
              ></i>
            </Link>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => {setDeletedItem(item); console.log(item); setDeleteModal(true)}}
              ></i>
            </Link>
          </div>
        );
      }
    }
  ];

  const customData = props.dictionary[0] ? props.exchanges.map((exchange)=>{
    return {
      exchanges:exchange
    };
  }) : [] ; 
  const deleteExchange = ()=>{
    dispatch(removeItem(props.id, deletedItem));
  };
  
  return (

    <React.Fragment>
    
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between  align-items-center">
            <CardTitle>Exchanges</CardTitle>
            <ExchangeAddModal/>
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
                  {!props.loading && customData.map((row, rowIndex) =>
                           
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
      {<ExchangeEdit open={editModal} exchange={selectedExchange} onClose={()=>setEditModal(false)}/>}
      {<DeleteModal loading={props.deleteLoading} show ={deleteModal} onDeleteClick={deleteExchange} onCloseClick={()=>setDeleteModal(false)}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || [],
  exchanges: state.dictionaryReducer.exchanges  || [],
  deleteLoading :state.dictionaryReducer.deleteLoading,
  id:state.dictionaryReducer.id
});
export default connect(mapStateToProps, null)(ExchangesTab);