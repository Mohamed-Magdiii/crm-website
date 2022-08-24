import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

import {
  Card,
  CardBody,
  Container,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import {
  useDispatch, connect,
} from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TodoAdd from "components/Common/TodoAdd";
// import Loader from "components/Common/Loader";

import "@fullcalendar/bootstrap/main.css";
import { editTodoStart, fetchTodosStart } from "store/actions";

//redux
import ViewTodo from "./ViewTodo";
import moment from "moment";
import Confirm from "components/Common/Confirm";

const Reminder = (props) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [dateRange, setDateRange] = useState({
    startStr: "",
    endStr: "",
  });
  const [addModal, setAddReminderModal] = useState(false);
  const [todoObj, setTodoObj] = useState({
    note: "",
    timeEnd: "",
    type: "1",
    _id: "",
  });
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(()=>{
    setEvents(props.todos.map(obj => {
      return {
        ...obj,
        className: obj.type === 1 ? "bg-success text-white" : "bg-info text-white",
        id: obj._id,
        title: obj.note,
        start: obj.timeEnd,
        timeEnd: obj.timeEnd,
      };
    }));
  }, [props.todos]);

  const handleDateClick = (arg) => {
    var date = new Date(arg["date"]);
    date.setDate(date.getDate() + 1);
    setSelectedDay(date.toISOString());
    setAddReminderModal(true);
  };

  const handleEventClick = (arg) => {
    setTodoObj({
      ...arg.event.extendedProps,
      _id: arg.event.id
    });
    setShowViewModal(true);
  };

  const dateRangeChange = (arg) => {
    if (dateRange.startStr !== arg.startStr || dateRange.endStr !== arg.endStr) {
      setDateRange({
        ...dateRange,
        ...arg,
      });
      dispatch(fetchTodosStart({
        page: 1,
        limit: 1000,
        start: arg.startStr,
        end: arg.endStr,
      }));
    }
  };

  const handleDrop  = (args) => {
    const todo = args.oldEvent._def.extendedProps;
    const end = moment(args.event.start);
    const now = moment();
    if (now.diff(end) > 0){
      args.revert();
    } else 
      dispatch(editTodoStart({
        id:todo._id,
        timeEnd:args.event.start, 
        note: todo.note,
        time: todo.createAt,
        type: 0,
        status: "open"
      }));
  };

  return (
    <React.Fragment>
      <TodoAdd
        show={addModal} 
        selectedDay={selectedDay} 
        hidenAddButton={true}
        selectedDate={selectedDay}
        onClose={() => { setAddReminderModal(false)}}
      />
      <ViewTodo
        show={showViewModal}
        data={todoObj}
        onClose={() => { setShowViewModal(false) }}
      />
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
              {/* {props.loading && <Loader />} */}
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
                // droppable={true}
                selectable={true}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={handleDrop}
                datesSet={dateRangeChange}
              />
            </CardBody>
          </Card>
        </Container>
        <Confirm
          show={showConfirmationModal}
        ></Confirm>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  clientDetails: state.clientReducer.clientDetails || {},
  todos: state.todosReducer.list && state.todosReducer.list.docs || [],
  loading: state.todosReducer.loading,
  deletingClearCounter: state.todosReducer.deletingClearCounter,
});

export default connect(mapStateToProps, null)(withTranslation()(Reminder));
