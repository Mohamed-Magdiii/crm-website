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
import Select from "react-select";

import { AsyncPaginate } from "react-select-async-paginate";

import loadOptions from "./loadOptions";
import { getPricing } from "./../../../apis/orders";

function OrdersAddModal(props) {
  const { buttonText } = props;
  const [addModal, setAddOrderModal] = useState(false);
  const [symbolValue, setSymbolValue] = useState(null);
  const [clientId] = useState(props?.clientId);
  const [type, setType] = useState(null);
  const [side, setSide] = useState(null);
  const [priceFlag, setPriceFlag] = useState(true);
  const [sympolAle, setsympolAle] = useState(false);
  const [typeAle, settypeAle] = useState(false);
  const [sideAle, setsideAle] = useState(false);
  const [pricing, setPricing] = useState("");
  const [showPricing, setShowPricing] = useState(false);

  const dispatch = useDispatch();
  const toggleAddModal = () => {
    setAddOrderModal(!addModal);
  };
  const handleAddOrder = (e, values) => {
    values.symbol = symbolValue?.value;
    values.type = type;
    values.side = side;
    values.customerId = clientId;
    Object.keys(values).forEach(key => {
      if (values[key] === "" || values[key] === null) {
        delete values[key];
      }
    });
    showAlert(symbolValue, type, side);
    if (symbolValue && type && side) {
      dispatch(addOrder(values));
      setSymbolValue(null);
      setShowPricing(false);
    }
  };
  const getPricingHandel = (pair) => {
    getPricing({
      pairName: pair
    })
      .then(response => {
        setShowPricing(true);
        setPricing("Current Price " + pair + ": " + (response.docs[0]?.marketPrice || "Not known"));
      }
      )
      .catch(() => {
      });
  };
  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setTimeout(() => {
        setAddOrderModal(false);
      }, 1000);
    }
  }, [props.addSuccess]);

  const defaultAdditional = {
    page: 1,
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

  const sympolhandler = (val) => {
    getPricingHandel(val?.value);
    setSymbolValue(val);
  };
  const typehandler = (val) => {
    if (val?.value == "market") {
      setPriceFlag(false);
    } else {
      setPriceFlag(true);
    } 
    setType(val?.value);
  };
  const sidehandler = (val) => {
    setSide(val?.value);
  };
  const showAlert = (symopl, type, side) => {
    if (!symopl) {
      setsympolAle(true);
    }
    if (!type) {
      settypeAle(true);
    }
    if (!side) {
      setsideAle(true);
    }
    setTimeout(() => {
      setsideAle(false);
      settypeAle(false);
      setsympolAle(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Link to="#" className="btn btn-primary" onClick={toggleAddModal}>
        <i className={`bx ${!buttonText ? "bx-plus" : ""} me-1`}></i> {`${buttonText ? buttonText : "Add New"}`}
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
            {(showPricing) ?
              <label className="form-label font-size-18 ">{pricing}</label>
              : ""}
            <div className="mb-3">
              <label>Symbol</label>
              <AsyncPaginate
                additional={defaultAdditional}
                value={symbolValue}
                loadOptions={loadPageOptions}
                onChange={sympolhandler}
                errorMessage="please select Order symbol"
                validate={{ required: { value: true } }}
              />
              {sympolAle && (
                <label className="form-label font-size-13 text-danger">please select Order symbol</label>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="choices-single-default" className="form-label font-size-13 text-muted">Type</label>
              <Select
                // value={selectedGroup}
                onChange={(val) => {
                  typehandler(val);
                }}
                options={[
                  {
                    label: "limit",
                    value: "limit"
                  },
                  {
                    label: "market",
                    value: "market"
                  }
                ]}
                classNamePrefix="select2-selection"
              />
              {typeAle && (
                <label className="form-label font-size-13 text-danger">please select Order Type</label>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="choices-single-default" className="form-label font-size-13 text-muted">Side</label>
              <Select
                // value={selectedGroup}
                onChange={(val) => {
                  sidehandler(val);
                }}
                options={[
                  {
                    label: "buy",
                    value: "buy"
                  },
                  {
                    label: "sell",
                    value: "sell"
                  }
                ]} classNamePrefix="select2-selection"
              />
              {sideAle && (
                <label className="form-label font-size-13 text-danger">please select Order Side</label>
              )}
            </div>
            <div className="mb-3">
              <AvField
                name="amount"
                label="Amount"
                placeholder="Amount"
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
                  label="Price"
                  placeholder="Price"
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
