import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import {
  Card,
  CardBody,
  Container,
} from "reactstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  deleteEvent as onDeleteEvent,
  getEvents as onGetEvents,
} from "../../store/actions";

import DeleteModal from "components/Common/DeleteModal";
//css
import "@fullcalendar/bootstrap/main.css";
import { updateEvent } from "../../apis/reminder";
import { showSuccessNotification, showErrorNotification } from "store/notifications/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import EditReminderModal from "./EditReminderModal";
import AddReminderModal from "./AddReminderModal";
import Confirm from "components/Common/Confirm";

const Reminder = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => ({
    events: state.calendar.events,
  }));
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [event, setEvent] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  // ################################
  const [editModal, setEditReminderModal] = useState(false);
  const [addModal, setAddReminderModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [editLoad, setEditLoad] = useState(0);
  const [eventData, setEventData] = useState({});

  // ################################

  useEffect(() => {
    dispatch(onGetEvents({
      page: 1,
      limit: 200,
    }));
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

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg) => {
    const date = arg["date"];
    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDay(tomorrow.toISOString().replace(/00:00.000Z/, "01"));
    setAddReminderModal(true);

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
    let dat = new Date(eventData.extendedProps?.timeEnd);
    dat?.setHours(dat.getHours() + 2);
    dat = dat.toISOString().replace(/.000Z/, "");
    // console.log(d?.setHours(d.getHours() + 2));
    // console.log(d?.setHours(d.getHours() + 2).toISOString().replace(/.000Z/, ""));
    setEvent({
      id: eventData.id,
      title: eventData.title,
      createdBy: eventData.extendedProps?.createdBy,
      client: eventData.extendedProps?.customerId,
      status: eventData.extendedProps?.status,
      type: eventData.extendedProps?.type,
      // timeEnd: eventData.extendedProps?.timeEnd.replace(/.000Z/, ""),
      timeEnd: dat,
      // differentStartReminderAndNow: dateDifference(new Date(eventData.extendedProps?.timeStart), new Date()),
      differentEndReminderAndNow: dateDifference(new Date(eventData.extendedProps?.timeEnd), new Date()),
    });
    setEditReminderModal(true);

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
   * On calendar drop event
   */
  const onDrop = () => {
    // console.log("modifiedData"); 
  };
  const showNotification = (message = "", err) => {
    if (err) {
      dispatch(showErrorNotification(message));

    } else {
      dispatch(showSuccessNotification(message));
    }
  };
  const update = () => {
    // console.log(event.event._def);
    const v = new Date(eventData.event?._def.extendedProps.timeEnd);
    //  console.log(new Date(new Date(event.event._def.extendedProps.timeEnd).setDate(v.getDate() + event.delta.days)).toISOString());
    const newDate = {
      timeEnd: new Date(new Date(eventData.event?._def.extendedProps.timeEnd).setDate(v.getDate() + eventData.delta.days)).toISOString(),
      note: eventData.event?._def.title,
      status: eventData.event?._def.extendedProps.status,
      type: eventData.event?._def.extendedProps.type,

    };
    updateEvent(eventData.event._def.publicId, newDate)
      .then(() => {
        showNotification("date updated successfully");
      }
      )
      .catch(() => {
        showNotification("Date updated faild", true);

      });
    setConfirmModal(false);
  };
  const handleEventReceive = (event) => {
    setEventData(event);
    setConfirmModal(true);
    // // console.log(event.event._def);
    // const v = new Date(event.event._def.extendedProps.timeEnd);
    // //  console.log(new Date(new Date(event.event._def.extendedProps.timeEnd).setDate(v.getDate() + event.delta.days)).toISOString());
    // const newDate = {
    //   timeEnd: new Date(new Date(event.event._def.extendedProps.timeEnd).setDate(v.getDate() + event.delta.days)).toISOString(),
    //   note: event.event._def.title,
    //   status: event.event._def.extendedProps.status,
    //   type: event.event._def.extendedProps.type,

    // };
    // updateEvent(event.event._def.publicId, newDate)
    //   .then(() => {
    //     showNotification("date updated successfully");
    //   }
    //   )
    //   .catch(() => {
    //     showNotification("Date updated faild", true);

    //   });
  };
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      {<EditReminderModal openEdit={editModal} eventReminder={event} onClose={() => { setEditReminderModal(false); setEditLoad(editLoad + 1) }} />}
      {<AddReminderModal openAdd={addModal} selectedDate={selectedDay} onClose={() => { setAddReminderModal(false); setEditLoad(editLoad + 1) }} />}

      <div className="page-content">
        <MetaTags>
          <title>Reminders</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Minia" breadcrumbItem="Reminders" />
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
                eventDrop={handleEventReceive}
                drop={onDrop}

              />
            </CardBody>
          </Card>
        </Container>
        <Confirm
          onYesClick={update}
          show={confirmModal}
          onCloseClick={() => { setConfirmModal(false); setEditLoad(editLoad + 1) }}
        ></Confirm>
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
