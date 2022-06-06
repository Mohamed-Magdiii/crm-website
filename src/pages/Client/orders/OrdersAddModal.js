import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
// import { addOrder } from "store/Orders/actions";
import { addOrder } from "store/orders/actions";

import { AsyncPaginate } from "react-select-async-paginate";

import loadOptions from "./loadOptions";

function OrdersAddModal(props) {
  const [addModal, setAddOrderModal] = useState(false);
  const [symbolValue, setSymbolValue] = useState(null);
  const [clientId, setClientId] = useState(props?.clientId);
  const [priceFlag, setPriceFlag] = useState(true);

  const dispatch = useDispatch();
  // const { usersRoles } = props;
  // const [SearchInputValue, setSearchInputValue] = useState("hi");

  const toggleAddModal = () => {
    setAddOrderModal(!addModal);
  };
  const handleAddOrder = (e, values) => {
    values.symbol = symbolValue?.value;
    values.customerId = clientId;
    // console.log(managerValue);
    // console.log(values);
    dispatch(addOrder(values));
    setSymbolValue(null);
  };

  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setTimeout(() => {
        setAddOrderModal(false);
      }, 1000);
    }
  }, [props.addSuccess]);

  // const [selectedGroup, setselectedGroup] = useState(null);

  const defaultAdditional = {
    page: 1,
  };
  const price = (val) => {
    if (val?.target?.value == "market") {
      setPriceFlag(false);
    } else {
      setPriceFlag(true);
    }
    console.log(val.target.value);
  };
  const loadPageOptions = async (q, prevOptions, { page }) => {
    const { options, hasMore } = await loadOptions(q, page);

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <React.Fragment>
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i> Add New
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Order
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={(e, v) => {
              handleAddOrder(e, v);
            }}
          >


            <div className="mb-3">
              <label>symbol</label>
              <AsyncPaginate
                additional={defaultAdditional}
                value={symbolValue}
                loadOptions={loadPageOptions}
                onChange={setSymbolValue}
                errorMessage="please select Order symbol"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                label="type"
                type="select"
                name="type"
                onChange={price}
                // value={status}
                validate={{
                  required: { value: true },
                }}
              >
                <option value="">select</option>
                <option>limit</option>
                <option>market</option>

              </AvField>
            </div>
            <div className="mb-3">
              <AvField
                label="side"
                type="select"
                name="side"
                // value={status}
                validate={{
                  required: { value: true },
                }}
              >
                <option value="">select</option>
                <option>buy</option>
                <option>sell</option>

              </AvField>
            </div>
            <div className="mb-3">
              <AvField
                name="amount"
                label="amount"
                placeholder="amount"
                type="number"
                errorMessage="Enter amount"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="mb-3">
              <AvField
                name="tp"
                label="Take Profit"
                placeholder="Take Profit"
                type="number"
                errorMessage="Enter Take Profit"
              />
            </div>
            <div className="mb-3">
              <AvField
                name="sl"
                label="Stop Loss"
                placeholder="Stop Loss"
                type="number"
                errorMessage="Enter Stop Loss"
              />
            </div>
            {priceFlag ?
              <div className="mb-3">
                <AvField
                  name="price"
                  label="price"
                  placeholder="price"
                  type="number"
                  errorMessage="Enter price"
                  validate={{ required: { value: true } }}
                />
              </div>
              : ""}
            <div className="text-center p-5">
              <Button type="submit" color="primary" className="">
                Add New Order
              </Button>
            </div>
          </AvForm>
          {props.addError && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {props.addErrorDetails}
            </UncontrolledAlert>
          )}
          {props.addSuccess && (
            <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
              Order Added successfully !!!
            </UncontrolledAlert>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.ordersReducer.addLoading,
  addErrorDetails: state.ordersReducer.addErrorDetails,
  addSuccess: state.ordersReducer.addSuccess,
  addError: state.ordersReducer.addError,
  // managersData: state.ordersReducer.managersData,
  clearingCounter: state.ordersReducer.clearingCounter,
});
export default connect(mapStateToProps, null)(OrdersAddModal);
