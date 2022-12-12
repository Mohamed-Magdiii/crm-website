
import React, { useState, useEffect  } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { AvField } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Col,
  Row,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchLOBStart } from "./../../store/lob/actions";
import { editProductStart } from "./../../store/products/actions";


function ProductsEdit(props){
  const { open, selectedItem = {}, onClose } = props;
  const dispatch = useDispatch();
  const [addModal, setAddMarkupModal] = useState(false);
  const [productId, setProducId] = useState(selectedItem.product?._id);
  const toggleAddModal = () => {
    setAddMarkupModal(!addModal);
  };  
  const updateProduct = (e, val) =>{
    e.preventDefault();
  
    dispatch(editProductStart(selectedItem._id, {
      ...val,
      product:productId
    }));
  };
  useEffect(()=>{
    loadLob();
  }, []);
  const loadLob = ()=>{
    dispatch(fetchLOBStart(1, 2000));
  };
  return (
    <React.Fragment >
      <Modal size="lg" isOpen={open} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Edit")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              updateProduct(e, v );
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title.en"
                    label={props.t("Title")}
                    placeholder={props.t("Enter English Title")}
                    type="text"
                    value={selectedItem.title?.en}
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title.ar"
                    label={props.t("Title")}
                    placeholder={props.t("Enter Arabic Title")}
                    type="text"
                    value={selectedItem.title?.ar}
                    errorMessage={props.t("Enter Valid title")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
        
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description.en"
                    label={props.t("Description English")}
                    placeholder={props.t("Enter English Description")}
                    type="text"
                    value={selectedItem.description?.en}
                    errorMessage={props.t("Enter Valid description")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="description.ar"
                    label={props.t("Description Arabic")}
                    placeholder={props.t("Enter Descriptionb Arabic")}
                    type="text"
                    value={selectedItem.description?.ar}
                    errorMessage={props.t("Enter Valid description")}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Col md="6">
                  <div className="mb-3">
                    <label >Select LOB </label>
                    <AvField
                      type="select"
                      name="product"
                      onChange={(e) => setProducId(e.target.value) }
                      validate={{ required: { value: true } }}
                      value={selectedItem.product?._id}
                    >
                      <option value={selectedItem.product?._id}>{selectedItem.product?.title.en}</option>
                      {props.lob.map((row) => {
                        // console.log("edit modal"); 
                        return (<option key={row._id} value={row._id}>{row.title?.en}</option>);
                      })}
                     
                    </AvField>
                  </div>
                  {/* {!lobError && <small className="text-danger">{props.t("Choose Valid Lob")}</small>} */}
                </Col>
              </Col>
            </Row>
            <div className='text-center pt-3 p-2'>
              <Button  type="submit" color="primary" className="">
                {props.t("Edit")}
              </Button>
            </div>
          </AvForm>
          {
            props.error && (
              <UncontrolledAlert color="danger">
                <i className="mdi mdi-block-helper me-2" />
                {props.t(props.error)}
              </UncontrolledAlert>
            )
          }
          {
            props.showEditSuccessMessage && (
              <UncontrolledAlert color="success">
                <i className="mdi mdi-check-all me-2" />
                {props.t("LOB Group is updated successfully !!!")}
              </UncontrolledAlert>
            )
          }
        
        </ModalBody>
      </Modal>
    </React.Fragment>  
  );
}
const mapStateToProps = (state) => ({
  error: state.lob.error,
  showEditSuccessMessage: state.lob.showEditSuccessMessage,
  lob:state.lob.docs

});

export default connect(mapStateToProps, null)(withTranslation()(ProductsEdit));
