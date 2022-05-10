import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
  Card,
  CardBody,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

import { AvForm } from "availity-reactstrap-validation";
import { AsyncPaginate } from "react-select-async-paginate";
import loadMembersOptions from "./loadMembersOptions";

import { addTeamMembers, deleteTeamMembers } from "../../apis/teams";

function TeamsEditMembersModal(props) {
  const { open, team = {}, members = [], onClose } = props;
  // const { _id, title } = team.roleId || ""; 
  const [membersValue, setmembersValue] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    let structureMembers = [];
    members?.map(member => {
      structureMembers.push({
        id: member._id,
        name: member.firstName + " " + member.lastName
      });
    }
    );
    setmembersValue(structureMembers);
  }, [members]);
  const handleAddMembersTeam = () => {
    if (selectedMember.value) { 
      const memb = {
        "members": [
          selectedMember.value
        ]
      };

      addTeamMembers(team._id, memb)
        .then(response => { 
          if (response.status) {
            setmembersValue([{
              id: selectedMember.value,
              name: selectedMember.label
            }, ...membersValue]);
            showAlert(false, true);
          } 
        }
        )
        .catch(() => {
          seterrorMassage("connection error");
          showAlert(true, false);
        });
      setSelectedMember([]);
    }
  };
  const showAlert = (danger, succ) => {
    if (succ) {
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, 2000);
    } else if (danger) {
      setErrorAlertMassage(true);
      setTimeout(() => {
        setErrorAlertMassage(false);
      }, 2000);

    }
  };

  const handleDeleteMembersTeam = (id, index) => { 
    setAlertShow(true);
    const memb = {
      "members": [
        id
      ]
    };
    deleteTeamMembers(team._id, memb)
      .then(response => { 
        if (response.status) {
          setmembersValue(membersValue.filter((item, i) => i !== index));
          showAlert(false, true);
        } 
      }
      )
      .catch(() => {
        seterrorMassage("connection error");
        showAlert(true, false);
      });
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
  const loadPageOptions = async (q, perPage, { page }) => {
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
              handleAddMembersTeam(e, v);
            }}
          >
            <div className="mb-3">
              <label>Team Members</label>

              <AsyncPaginate
                additional={defaultAdditional}
                value={selectedMember}
                loadOptions={loadPageOptions}
                onChange={setSelectedMember}
                errorMessage="please select Team Member"
                validate={{ required: { value: true } }}
              />
            </div>
            <div className="text-center p-5">
              <Button type="submit" color="primary" className="">
                Add To Team
              </Button>

            </div>
            {alertShow && (
              <UncontrolledAlert color="success">
                <i className="mdi mdi-check-all me-2"></i>
                Team Updated successfully !!!
              </UncontrolledAlert>
            )}
            {errorAlert && (
              <UncontrolledAlert color="danger">
                <i className="mdi mdi-block-helper me-2"></i>
                {errorMassage}
              </UncontrolledAlert>
            )}
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive-md">
                    <table className="MuiTable-root table table-hover text-nowrap mb-0">
                      <thead>
                        <tr>
                          <th className="bg-white text-center">Team Members</th>
                          <th className="bg-white text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {membersValue.map((memberVal, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">
                                <div>{memberVal.name}</div>
                              </td>
                              <td className="text-center">
                                <Link className="text-danger" to="#">
                                  <i
                                    className="mdi mdi-delete font-size-18"
                                    id="deletetooltip"
                                    onClick={() => { handleDeleteMembersTeam(memberVal.id, i) }}>
                                  </i>
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                        )
                        }
                      </tbody>
                    </table>
                  </div>

                </CardBody>
              </Card>
            </Col>

          </AvForm>
          {/* {alertShow && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {alertMassage}
            </UncontrolledAlert>
          )} */}
          {/* {alertShow && (
            <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
              Team Updated successfully !!!
            </UncontrolledAlert>
          )} */}
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
