import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap"; 
import { AvForm } from "availity-reactstrap-validation";
import { editTeamMembers } from "store/teams/actions";
import { AsyncPaginate } from "react-select-async-paginate";
import loadMembersOptions from "./loadMembersOptions";

function TeamsEditMembersModal(props) {
  const { open, team = {}, members = [], onClose } = props;
  // const { _id, title } = team.roleId || ""; 
  const [membersValue, setmembersValue] = useState([]);

  useEffect(() => { 
    let structureMembers = [];
    members?.map(member => { 
      structureMembers.push({
        value: member._id,
        label: member.firstName
      });
    }
    );
    setmembersValue(structureMembers);
  }, [members]);

  const dispatch = useDispatch();
  const handleEditMembersTeam = () => {
    let reformattedMembersArray = membersValue.map(obj => {
      return obj.value;
    });
    // console.log(reformattedMembersArray);
    // values.managerId = managerValue.value;
    dispatch(
      editTeamMembers({
        id: team._id,
        values: { members:reformattedMembersArray },
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
    const { options, hasMore } = await loadMembersOptions(q, page);

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
      <Modal isOpen={open} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Team Members
        </ModalHeader>
        <ModalBody>
          <AvForm
            className="p-4"
            onValidSubmit={(e, v) => {
              handleEditMembersTeam(e, v);
            }}
          >
            <div className="mb-3">
              <label>Team Members</label>

              <AsyncPaginate
                additional={defaultAdditional}
                default={members}
                value={membersValue}
                loadOptions={loadPageOptions}
                onChange={setmembersValue}
                isMulti
                errorMessage="please select Team Manager"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="text-center p-5">
              <Button type="submit" color="primary" className="">
                Update Team
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
              Team Updated successfully !!!
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
export default connect(mapStateToProps, null)(TeamsEditMembersModal);
