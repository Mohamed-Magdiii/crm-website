import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { AsyncPaginate } from "react-select-async-paginate";
import loadClientsOptions from "./loadClientsOptions";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";

//import images
import calendar from "../../assets/images/undraw-calendar.svg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  getCategories as onGetCategories,
  getEvents as onGetEvents,
  updateEvent as onUpdateEvent,
} from "../../store/actions";

import DeleteModal from "components/Common/DeleteModal";
//css
import "@fullcalendar/bootstrap/main.css";

//redux
import { useSelector, useDispatch } from "react-redux";
 
const Reminder = (props) => {
  const dispatch = useDispatch();

  const { events, categories } = useSelector((state) => ({
    events: state.calendar.events,
    categories: state.calendar.categories,
  }));
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalcategory, setModalcategory] = useState(false);
  const [event, setEvent] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
 
  useEffect(() => {
    dispatch(onGetEvents());
  }, [dispatch, editLoad]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  };

  const toggleCategory = () => {
    setModalcategory(!modalcategory);
  };

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg) => {
    const date = arg["date"];
    // const day = date.getDate();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    // console.log(day);
    // console.log(month);
    // console.log(year);
    // console.log(date);
    // const currectDate = new Date();
    // const currentHour = currectDate.getHours();
    // const currentMin = currectDate.getMinutes();
    // const currentSec = currectDate.getSeconds();
    // const modifiedDate = new Date(
    //   year,
    //   month,
    //   day,
    //   currentHour,
    //   currentMin,
    //   currentSec
    // );
    // const modifiedData = {
    //   ...arg,
    //   date: modifiedDate,
    // };
    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("*********************");
    console.log(tomorrow.toISOString().replace(/.000Z/, ""));

    let modifiedData = new Date(date);
    // modifiedData.setMinutes(date.getMinutes());

    console.log("from add Click");
    // console.log(currectDate);
    console.log(modifiedData.toJSON());
    // setSelectedDay(new Date(date).toISOString().replace(/.000Z/, ""));
    setSelectedDay(tomorrow.toISOString().replace(/.000Z/, ""));
    setAddReminderModal(true);
    // toggle();
  };

  /**
   * Handling click on event on calendar
   */
  const dateDifference = (date2, date1) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };
  const handleEventClick = (arg) => {

    const eventData = arg.event;
    setEvent({
      id: eventData.id,
      title: eventData.title,
      createdBy: eventData.extendedProps?.createdBy,
      client: eventData.extendedProps?.customerId,
      status: eventData.extendedProps?.status,
      timeStart: eventData.extendedProps?.timeStart.replace(/.000Z/, ""),
      timeEnd: eventData.extendedProps?.timeEnd.replace(/.000Z/, ""),
      differentStartReminderAndNow: dateDifference(new Date(eventData.extendedProps?.timeStart), new Date()),
      differentEndReminderAndNow: dateDifference(new Date(eventData.extendedProps?.timeEnd), new Date()),
    });
    // console.log("yes i'm");
    // console.log("yes i'm");
    // let differentEndReminderAndNow = dateDifference(new Date(eventData.extendedProps?.timeEnd), new Date());
    // // Example
    // if (differentEndReminderAndNow < 0) {
    //   differentEndReminderAndNow = differentEndReminderAndNow * -1;
    //   console.log(differentEndReminderAndNow + " ago");

    // } else {
    //   console.log(differentEndReminderAndNow + " days");

    // }
    // console.log(differentEndReminderAndNow);
    // console.log(dateDifference(new Date(eventData.extendedProps?.timeEnd), new Date(eventData.extendedProps?.timeStart)));

    console.log("handleEventClick");
    console.log(event);
    setEditReminderModal(true);
    // toggle();
  };

  /**
   * Handling submit event on event form
   */
  const handleValidEventSubmit = (e, values) => {
    if (isEdit) {
      const updateEvent = {
        id: event.id,
        title: values.title,
        classNames: values.category + " text-white",
        start: event.start,
      };
      // update event
      dispatch(onUpdateEvent(updateEvent));
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.category + " text-white",
      };
      // save new event
      dispatch(onAddNewEvent(newEvent));
    }
    setSelectedDay(null);
    toggle();
  };

  const handleValidEventSubmitcategory = (event, values) => {
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: values["title_category"],
      start: selectedDay ? selectedDay.date : new Date(),
      className: values.event_category
        ? values.event_category + " text-white"
        : "bg-danger text-white",
    };
    // save new event

    dispatch(onAddNewEvent(newEvent));
    toggleCategory();
  };

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(onDeleteEvent(event));
    setDeleteModal(false);
    toggle();
  };

  /**
   * On category darg event
   */
  const onDrag = (event) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = (event) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const modifiedData = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: modifiedDate,
      className: draggedEl.className,
    };
    dispatch(onAddNewEvent(modifiedData));
  };


  const [managerValue, setManagerValue] = useState(null);

  const defaultAdditional = {
    page: 1,
  };

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
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
     
      <div className="page-content">
        <MetaTags>
          <title>Reminders</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Minia" breadcrumbItem="Reminders" />
          <Row>
            <Col xs={12}>
              <Row>
                <Col xl={12} lg={8}>
                  <Card>
                    <CardBody>
                      {/* fullcalendar control */}
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        events={events}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        drop={onDrop}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div style={{ clear: "both" }}></div>
              {/* New/Edit event modal */}
              <Modal isOpen={modal} className={props.className}>
                <ModalHeader toggle={toggle} tag="h4">
                  {!!isEdit ? "Edit Event" : "Add Event"}
                </ModalHeader>
                <ModalBody>
                  <AvForm onValidSubmit={handleValidEventSubmit}>
                    <Row form>
                      <Col className="col-12 mb-3">
                        <AvField
                          name="title"
                          label="Event Name"
                          type="text"
                          errorMessage="Invalid name"
                          validate={{
                            required: { value: true },
                          }}
                          value={event ? event.title : ""}
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          type="select"
                          name="category"
                          label="Select Category"
                          validate={{
                            required: { value: true },
                          }}
                          value={event ? event.category : "bg-primary"}
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Success</option>
                          <option value="bg-primary">Primary</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Dark</option>
                          <option value="bg-warning">Warning</option>
                        </AvField>
                      </Col>

                      <Col className="col-12 mb-3">
                        <label>Select Client</label>

                        <AsyncPaginate
                          additional={defaultAdditional}
                          value={managerValue}
                          loadOptions={loadPageOptions}
                          onChange={setManagerValue}
                          errorMessage="please select Team Manager"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggle}
                          >
                            Close
                          </button>
                          {!!isEdit && (
                            <button
                              type="button"
                              className="btn btn-danger me-2"
                              onClick={() => setDeleteModal(true)}
                            >
                              Delete
                            </button>
                          )}
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={modalcategory}
                toggle={toggleCategory}
                className={props.className}
              >
                <ModalHeader toggle={toggleCategory} tag="h4">
                  Add a category
                </ModalHeader>
                <ModalBody>
                  <AvForm onValidSubmit={handleValidEventSubmitcategory}>
                    <Row form>
                      <Col className="col-12 mb-3">
                        <AvField
                          name="title_category"
                          label="Category Name"
                          type="text"
                          errorMessage="Invalid name"
                          validate={{
                            required: { value: true },
                          }}
                          value={
                            event.title_category ? event.title_category : ""
                          }
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <AvField
                          type="select"
                          name="event_category"
                          label="Choose Category Color"
                          value={event ? event.event_category : "bg-primary"}
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Success</option>
                          <option value="bg-primary">Primary</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Dark</option>
                          <option value="bg-warning">Warning</option>
                        </AvField>
                      </Col>
                      <Col className="col-12 mb-3">
                        <label>Team Manager</label>

                        <AsyncPaginate
                          additional={defaultAdditional}
                          value={managerValue}
                          loadOptions={loadPageOptions}
                          onChange={setManagerValue}
                          errorMessage="please select Team Manager"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggleCategory}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Reminder.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Reminder;
