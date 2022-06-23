import React, { useState, useEffect } from "react";
import { 
  connect, 
  useDispatch
} from "react-redux";
import { Link } from "react-router-dom";
import {
  CardBody, Card, CardHeader
} from "reactstrap";
import { withTranslation } from "react-i18next";
import EmailProviderAdd from "./EmailProviderAdd";
import {
  Table, Thead, Tbody, Tr, Th, Td
} from "react-super-responsive-table";
import TableLoader from "components/Common/TableLoader";
import DeleteModal from "components/Common/DeleteModal";
import { removeItem } from "store/dictionary/actions";
import EmailProviderEdit from "./EmailProviderEdit";
import { captilazeFirstLetter } from "common/utils/manipulateString";
function EmailProvidersTab(props){
  const [selectedEmailProvider, setSelectedEmailProvider] = useState();
  const [deletedItem, setDeletedItem] = useState();
  const [ deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const { update, delete:deletePermission } = props.dictionariesPermissions;
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
      dataField:"emailProviders",
      text:props.t("Email Providers"),
      formatter :(val)=>captilazeFirstLetter(val.emailProviders)
    }, 
    {
      dataField: "",
      isDummyField: true,
      editable: false,
      text: props.t("Action"),
      formatter: (item) => {
        return (
          <div className="d-flex gap-3">
            <Link className={`text-success ${!update ? "d-none" : ""}`} to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => {setSelectedEmailProvider(item); setEditModal(true)}}
              ></i>
            </Link>
            <Link className={`text-danger ${!deletePermission ? "d-none" : ""}`} to="#">
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
          <div className="d-flex justify-content-end  align-items-center">
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
                <Tbody style = {{ fontSize:"13px" }}>
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
      {<EmailProviderEdit open={editModal} selectedEmailProvider={selectedEmailProvider} onClose={()=>setEditModal(false)}/>}
      {<DeleteModal loading = {props.disableDeleteButton} show ={deleteModal} onDeleteClick={deleteEmailProvider} onCloseClick={()=>setDeleteModal(false)}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || [],
  emailProviders :state.dictionaryReducer.emailProviders || [],
  id:state.dictionaryReducer.id,
  disableDeleteButton: state.dictionaryReducer.disableDeleteButton,
  editSuccess : state.dictionaryReducer.editSuccess,
  clearDeleteModal :state.dictionaryReducer.clearDeleteModal,
  dictionariesPermissions : state.Profile.dictionariesPermissions || {},
  
});

export default connect(mapStateToProps, null)(withTranslation()(EmailProvidersTab));