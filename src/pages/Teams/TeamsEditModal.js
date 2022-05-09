import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { editTeam } from "store/teams/actions";
import { AsyncPaginate } from "react-select-async-paginate";
import loadOptions from "./loadOptions";

function TeamsEditModal(props) {
  const { open, team = {}, manager, onClose } = props;
  const [managerValue, setManagerValue] = useState(null);
  useEffect(() => {
    // setTimeout(function() { 
    setManagerValue({
      value: team.managerId?._id,
      label: team.managerId?.firstName,
    });
    // }, 3000);

  }, [manager]);
  const dispatch = useDispatch();
  // console.log(usersRoles);
  const handleEditTeam = (e, values) => { 
    values.managerId = managerValue.value;
    dispatch(
      editTeam({
        id: team._id,
        values,
      })
    );
  };
  useEffect(() => { 
    if (props.editClearingCounter > 0 && open) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [props.editSuccess]);

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
  useEffect(() => {
    if (props.editClearingCounter > 0 && open) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [props.editSuccess]);
  return (
    <React.Fragment>
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit User
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={(e, v) => {
              handleEditTeam(e, v);
            }}
          >
            <div className="mb-3">
              <AvField
                name="title"
                label="Team Title  "
                placeholder="Team Title"
                type="text"
                errorMessage="Enter Team Title"
                value={team.title}
                validate={{ required: { value: true } }}
              />
            </div> 
            <div className="mb-3">
              <label>Team Manager</label>

              <AsyncPaginate
                additional={defaultAdditional}
                default={manager}
                value={managerValue}
                loadOptions={loadPageOptions}
                onChange={setManagerValue}
                errorMessage="please select Team Manager"
                validate={{ required: { value: true } }}
              />
            </div> 
            <div className="text-center p-5">
              <Button type="submit" color="primary" className="">
                Edit User
              </Button>
            </div>
          </AvForm>
          {props.editError && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {props.editError}
            </UncontrolledAlert>
          )}
          {props.editResult && (
            <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
              Role Updated successfully !!!
            </UncontrolledAlert>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  addLoading: state.teamsReducer.addLoading,
  editResult: state.teamsReducer.editResult,
  editError: state.teamsReducer.editError,
  editSuccess: state.teamsReducer.editSuccess,
  editClearingCounter: state.teamsReducer.editClearingCounter,
});
export default connect(mapStateToProps, null)(TeamsEditModal);
