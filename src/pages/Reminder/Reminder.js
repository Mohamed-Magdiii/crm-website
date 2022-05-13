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

//redux
import { useSelector, useDispatch } from "react-redux";
import EditReminderModal from "./EditReminderModal";
import AddReminderModal from "./AddReminderModal";

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
  const [editLoad, setEditLoad] = useState(0);

  // ################################

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

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg) => {
    const date = arg["date"];
    var tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDay(tomorrow.toISOString().replace(/.000Z/, ""));
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
    setEvent({
      id: eventData.id,
      title: eventData.title,
      createdBy: eventData.extendedProps?.createdBy,
      client: eventData.extendedProps?.customerId,
      status: eventData.extendedProps?.status,
      type: eventData.extendedProps?.type,
      timeEnd: eventData.extendedProps?.timeEnd.replace(/.000Z/, ""),
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
  // const onDrop = (event) => {

  // const date = event["date"];
  // const day = date.getDate();
  // const month = date.getMonth();
  // const year = date.getFullYear();

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

  // const draggedEl = event.draggedEl;
  // const modifiedData = {
  //   id: Math.floor(Math.random() * 100),
  //   title: draggedEl.innerText,
  //   start: modifiedDate,
  //   className: draggedEl.className,
  // };
  // dispatch(onAddNewEvent(modifiedData));
  // };


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
              // drop={onDrop}
              />
            </CardBody>
          </Card>
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
