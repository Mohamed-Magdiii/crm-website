import React, {useState} from "react";
import { 
  connect, 
  useDispatch
} from "react-redux";
import { Link } from "react-router-dom";
import {
  CardBody, Card, CardTitle, CardHeader
} from "reactstrap";
import EmailProviderAdd from "./EmailProviderAdd";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import { removeItem } from "store/dictionary/actions";
import EmailProviderEdit from "./EmailProviderEdit";
function EmailProvidersTab(props){
  const [selectedEmailProvider, setSelectedEmailProvider] = useState();
  const [deletedItem, setDeletedItem] = useState();
  const [ deleteModal, setDeleteModal] = useState(false);
  const [editMoal, setEditMoal] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      dataField:"emailProviders",
      text:"Email Providers",
      editable:true,
      
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
                onClick={() => {setSelectedEmailProvider(item); setEditMoal(true)}}
              ></i>
            </Link>
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => {setDeletedItem(item) ; setDeleteModal(true)}}
              ></i>
            </Link>
          </div>
        );
      },
    }
  ];
  const customData = props.dictionary[0] ? props.emailProviders.map(emailProvider=>{
    return {
      emailProviders:emailProvider
    };
  }) : [] ; 
  const deleteEmailProvider = ()=>{
    dispatch(removeItem(props.id, deletedItem));
  }; 
  return (

    <React.Fragment>
    
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between  align-items-center">
            <CardTitle>Email Providers</CardTitle>
            <EmailProviderAdd/>
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
      {<EmailProviderEdit open={editMoal} emailProvider={selectedEmailProvider} onClose={()=>setEditMoal(false)}/>}
      {<DeleteModal loading={props.deleteLoading} show ={deleteModal} onDeleteClick={deleteEmailProvider} onCloseClick={()=>setDeleteModal(false)}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || [],
  emailProviders :state.dictionaryReducer.emailProviders || [],
  id:state.dictionaryReducer.id,
  deleteLoading : state.dictionaryReducer.deletingLoading || false
});

export default connect(mapStateToProps, null)(EmailProvidersTab);