import React, {useState} from "react";
import { connect, useDispatch } from "react-redux";
import {
  Card, CardBody, CardTitle, CardHeader 
} from "reactstrap";
import { Link } from "react-router-dom";
import ActionsAdd from "./ActionsAdd";
import Notification from "components/Common/Notification";
import DeleteModal from "components/Common/DeleteModal";
import TableLoader from "components/Common/TableLoader";
import ActionEdit from "./ActionEdit";
import { removeItem } from "store/dictionary/actions";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";

function ActionsTab(props){
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState();
  const [editModal, setEditModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState();
  const dispatch = useDispatch();
  const columns = [
    {
      dataField:"actions",
      text:"Action", 
    }, 
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => {setSelectedAction(item); setEditModal(!editModal)}}
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
      ),
    },
    
  ];
  const customData = props.dictionary[0] ? props.actions.map(action=>{
    return {

      actions:action 
    };
  }) : [] ; 
  const deleteAction = ()=>{
    dispatch(removeItem(props.id, deletedItem));
  };
  return (

    <React.Fragment>
    
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between  align-items-center">
            <CardTitle>Actions</CardTitle>
            <ActionsAdd/>
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
      {<ActionEdit open={editModal} action ={selectedAction} onClose= {()=>setEditModal(false)}/>}
      {<DeleteModal  loading={props.deleteLoading} show={deleteModal} onDeleteClick={deleteAction} onCloseClick={()=>setDeleteModal(false)}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  loading: state.dictionaryReducer.loading || false,
  dictionary: state.dictionaryReducer.dictionary || [],
  error : state.dictionaryReducer.error,
  actions :state.dictionaryReducer.actions || [],
  id :state.dictionaryReducer.id,
  deleteLoading : state.dictionaryReducer.deleteLoading
  
});
export default connect(mapStateToProps, null)(ActionsTab);