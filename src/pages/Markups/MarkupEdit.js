import React, { useEffect } from "react";
import {
  useDispatch, connect
} from "react-redux";
import {
  Row, Col,
  Modal, Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvInput,
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";
import { editMarkupStart } from "store/markups/actions";

function MarkupEdit(props) {
  const { open, markup = {}, onClose } = props;

  const dispatch = useDispatch();

  const handleMarkupUpdate = (e, values) => {
    e.preventDefault();
    dispatch(editMarkupStart({
      id: markup._id,
      values
    }));
  };
  useEffect(() => {
    if (props.editClear) {
      onClose();
    }
  }, [props.editClear]);

  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          {props.t("Edit Markup")}
        </ModalHeader>
        <ModalBody >
          <AvForm
            className='p-4'
            onValidSubmit={(e, v) => {
              handleMarkupUpdate(e, v);
            }}
          >
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="title"
                    label={props.t("Title")}
                    placeholder={props.t("Title")}
                    type="text"
                    errorMessage={props.t("Enter title of the markup")}
                    value={markup.title}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <AvField
                    name="value"
                    label={props.t("Value")}
                    placeholder={props.t("Value")}
                    type="text"
                    errorMessage={props.t("Enter Value")}
                    value={markup.value}
                    validate={{ required: { value: true } }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <AvInput type="checkbox" name="isPercentage" value={markup.isPercentage} /> is it precentage?
              </Col>
            </Row>
            <div className='text-center pt-3 p-2'>
              <Button disabled={props.addLoading} type="submit" color="primary" className="">
                {props.t("Update Markup")}
              </Button>
            </div>
          </AvForm>
          {props.error && <UncontrolledAlert color="danger">
            <i className="mdi mdi-block-helper me-2"></i>
            {props.t(props.error)}
          </UncontrolledAlert>}
          {props.editDone && <UncontrolledAlert color="success">
            <i className="mdi mdi-check-all me-2"></i>
            {props.t("Markup Updated successfully !!!")}
          </UncontrolledAlert>}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  editLoading: state.markupsReducer.editLoading,
  editDone: state.markupsReducer.editDone,
  editClear: state.markupsReducer.editClear,  
  error:state.markupsReducer.error
});
export default connect(mapStateToProps, null)(withTranslation()(MarkupEdit));
