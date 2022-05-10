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
import { addTeam } from "store/teams/actions";

import { AsyncPaginate } from "react-select-async-paginate";

import loadOptions from "./loadOptions";

function TeamsAddModal(props) {
  const [addModal, setAddTeamModal] = useState(false);
  const [managerValue, setManagerValue] = useState(null);

  const dispatch = useDispatch();
  // const { usersRoles } = props;
  // const [SearchInputValue, setSearchInputValue] = useState("hi");

  const toggleAddModal = () => {
    setAddTeamModal(!addModal);
  };
  const handleAddTeam = (e, values) => {
    values.managerId = managerValue?.value;
    // console.log(managerValue);
    // console.log(values);
    dispatch(addTeam(values));
    setManagerValue(null);
  };

  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setTimeout(() => {
        setAddTeamModal(false);
      }, 1000);
    }
  }, [props.addSuccess]);

  // const [selectedGroup, setselectedGroup] = useState(null);

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

  return (
    <React.Fragment>
      <Link to="#" className="btn btn-light" onClick={toggleAddModal}>
        <i className="bx bx-plus me-1"></i> Add New
      </Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          Add New Team
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={(e, v) => {
              handleAddTeam(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label="Team Title  "
                placeholder="Team Title"
                type="text"
                errorMessage="Enter Team Title"
                validate={{ required: { value: true } }}
              />
            </div> 

            <div className="mb-3">
              <label>Team Manager</label>

              <AsyncPaginate
                additional={defaultAdditional}
                value={managerValue}
                loadOptions={loadPageOptions}
                onChange={setManagerValue}
                errorMessage="please select Team Manager"
                validate={{ required: { value: true } }}
              />
            </div>

            <div className="text-center p-5">
              <Button type="submit" color="primary" className="">
                Add New User
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
              Team Added successfully !!!
            </UncontrolledAlert>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.teamsReducer.addLoading,
  addErrorDetails: state.teamsReducer.addErrorDetails,
  addSuccess: state.teamsReducer.addSuccess,
  addError: state.teamsReducer.addError,
  // managersData: state.teamsReducer.managersData,
  clearingCounter: state.teamsReducer.clearingCounter,
});
export default connect(mapStateToProps, null)(TeamsAddModal);