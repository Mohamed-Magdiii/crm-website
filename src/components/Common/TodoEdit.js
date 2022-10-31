import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, ModalHeader,
  ModalBody,
  Row, Col
} from "reactstrap";
import {
  AvForm, AvField, AvRadio, AvRadioGroup
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";

import { addTodosStart } from "store/todos/actions";


import * as clientsApi from "apis/client";

// const optionsPerPage = 3;

const loadClientsOptions = async (search, page) => {
  const payload = {
    page: page,
    limit: 30,
  };
  if (search) {
    payload.searchText = search;
  }
  const output = [];
  const data = await clientsApi
    .getClients({
      payload: payload,
    })
    .then((results) => {
      return results;
    });
  data.result?.docs?.map(function (item) {
    output.push({
      value: item._id,
      label: item.firstName + " " + item.lastName,
    });
  });
  return {
    options: output,
    hasMore: data.hasNextPage,
  };
};

function TodoAdd (props) {
  const [addModal, setAddTodoModal] = useState(false);
  
  const dispatch = useDispatch();
  const { create = true } = props.todosPermissions;
  const toggleAddModal = () => {
    setAddTodoModal(!addModal);
    if (props.onClose) {
      props.onClose();
    }
  };
  const handleAddTodo = (e, values) => {
    dispatch(addTodosStart({
      ...values, 
      id: todoObj._id
    }));
  };
  useEffect(()=>{
    if (props.clearingCounter > 0 && addModal) {
      setAddTodoModal(false);
      if (props.onClose) {
        props.onClose();
      }
    }
  }, [props.clearingCounter]);

  useEffect(()=>{
    setAddTodoModal(props.show);
  }, [props.show]);

  /**
   * For clients dropdown
   */
  const [clientValue, setclientValue] = useState(null);
  const [todoObj, setTodoObj] = useState({
    note: "",
    timeEnd: "",
    type: 1,
    _id: "",
  });
  const loadPageOptions = async (q, prevOptions, { page }) => {

    const { options, hasMore } = await loadClientsOptions(q, page);

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  useEffect(()=>{
    if (props.data && props.data.customerId && props.data.customerId._id) {
      setTodoObj(props.data);
    }
    if (props.selectedDay) {
      setTodoObj({
        ...todoObj,
        timeEnd: props.selectedDay,
      });
    }
  }, [props.data, props.selectedDay]);
  return (
    <React.Fragment >
      {!props.hidenAddButton &&
        <Link to="#"  className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New Todo</Link>
      }
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Edit { props.data.type === 0 ? "Todo" : "Reminder" }
        </ModalHeader>
        <ModalBody >
          <AvForm onValidSubmit={handleAddTodo}>
            <Row form>
              {props.selectedClient && <React.Fragment>
                <Col className="col-12 mb-3">
                  <label>{props.t("Client")}</label>
                  <h5>{props.t(props.selectedClient.firstName + " " + props.selectedClient.lastName)}</h5>
                </Col>
                <AvField
                  name="customerId"
                  type="hidden"
                  value={props.selectedClient?._id}
                />
              </React.Fragment>}
              {props.data && props.data.customerId && <React.Fragment>
                <Col className="col-12 mb-3">
                  <label>{props.t("Client")}</label>
                  <h5>{props.t(props.data.customerId.firstName + " " + props.data.customerId.lastName)}</h5>
                </Col>
              </React.Fragment>}
              {!props.selectedClient && !props.data && <Col className="col-12 mb-3">
                <label>Client</label>
                <AsyncPaginate
                  additional={{ page: 1 }}
                  value={clientValue}
                  loadOptions={loadPageOptions}
                  placeholder="Choose Client Name ..."
                  onChange={(obj)=>{setclientValue(obj)}}
                  errorMessage="please select Client"
                  validate={{ required: { value: true } }}
                />
                <AvField
                  style={{ display: "none" }}
                  name="customerId"
                  type="text"
                  errorMessage={props.t("Please Select Client")}
                  value={clientValue && clientValue.value}
                  validate={{
                    required: { value: true },
                  }}
                />

              </Col>}

              <Col className="col-12 mb-3">
                <AvField
                  name="note"
                  label={props.t("Note")}
                  type="text"
                  value={todoObj.note}
                  errorMessage={props.t("Invalid Reminder Note")}
                  validate={{
                    required: { value: true },
                  }}
                />
                
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="timeEnd"
                  value={todoObj.timeEnd.slice(0, -5) || new Date().toISOString().slice(0, -5)}
                  label={props.t("Date")}
                  errorMessage={props.t("Invalid Reminder Note")}
                >
                </AvField>
              </Col>
              <Col className="col-12 mb-3">
                <AvRadioGroup
                  inline
                  name="type"
                  value={todoObj.type}
                  label={props.t("Type")}
                  required
                  errorMessage={props.t("Invalid Reminder type")}
                >
                  <AvRadio label={props.t("Reminder")} value={1} />
                  <AvRadio label={props.t("Todo")} value={0} />
                </AvRadioGroup>
              </Col>

            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-event"
                  >
                    {props.t("Edit")}
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  todosPermissions: state.Profile.todosPermissions || {},
  clearingCounter: state.todosReducer.clearingCounter || 0,
});
export default connect(mapStateToProps, null)(withTranslation()(TodoAdd));
