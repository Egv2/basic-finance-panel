import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Modal, Button, Form } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

// Locale ve tarih işleme fonksiyonlarını ayarlama
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarModule = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleSelectSlot = ({ start, end }) => {
    setShowModal(true);
    setNewEvent({ ...newEvent, start, end });
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setShowModal(false);
    // Backend endpoint: POST /api/calendar/events
    // Backend'de yeni etkinlik ekleme kodu buraya gelecek
  };

  return (
    <div>
      <h1>Takvim</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
      />

      {/* Yeni etkinlik eklemek için modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add event name"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: new Date(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarModule;
