import dayjs from 'dayjs';
import { FLOORS_COUNT, FROORS_START_FROM, MIN_DEFAULT_TIME, ROOMS_COUNT } from '../../const';
import './styles/meeting-room-form.scss';
import { useEffect, useState } from 'react';

function MeetingRoomForm(props) {
  const {
    towers = [
      "Башня А",
      "Башня Б"
    ],
    floors = Array.from({ length: FLOORS_COUNT }, (v, k) => k + FROORS_START_FROM),
    rooms = Array.from({ length: ROOMS_COUNT }, (v, k) => k + 1),
    dateNow = dayjs().format('YYYY-MM-DD'),
    timeNow = dayjs().format('HH:mm'),
  } = props;

  const [tower, setTower] = useState('');
  const [floor, setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [comment, setComment] = useState('');
  const [minTimeStart, setMinTimeStart] = useState('');

  // Ставим минимальное время для конференции
  useEffect(() => {
    // Если выбрана сегодняшняя дата
    if (date === dateNow) {
      setMinTimeStart(timeNow);
      // Если дата не сегодняшняя, ставим значение по расписанию 
    } else {
      setMinTimeStart(MIN_DEFAULT_TIME);
    }
  }, [date])

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(JSON.stringify({
      tower: tower,
      floor: floor,
      room: room,
      date: date,
      timeStart: timeStart,
      timeEnd: timeEnd,
      comment: comment
    }));

    handleReset();
  }

  const handleReset = () => {
    setTower('');
    setFloor('');
    setRoom('');
    setDate('');
    setTimeStart('');
    setTimeEnd('');
    setComment('');
  }

  return (
    <section className="meeting-room-form">
      <h1>Бронирование переговорной</h1>
      <form
        action=""
        onSubmit={handleSubmit}
      >

        <div className="meeting-room-form__input-wrapper">
          <span>Выберите башню: </span>
          <select value={tower} onChange={(e) => setTower(e.target.value)} required>
            <option></option>
            {towers.map((tower) => {
              return (<option key={`tower-${tower}`}>{tower}</option>)
            })}
          </select>
        </div>

        <div className="meeting-room-form__input-wrapper">
          <span>Выберите этаж: </span>
          <select value={floor} onChange={(e) => setFloor(e.target.value)} required>
            <option></option>
            {floors.map((floor) => {
              return (<option key={`floor-${floor}`}>{floor}</option>)
            })}
          </select>
        </div>

        <div className="meeting-room-form__input-wrapper">
          <span>Выберите переговорку: </span>
          <select value={room} onChange={(e) => setRoom(e.target.value)} required>
            <option></option>
            {rooms.map((room) => {
              return (<option key={`room-${room}`}>{room}</option>)
            })}
          </select>
        </div>

        <div className="meeting-room-form__input-wrapper">
          <label htmlFor="date">Дата:</label>
          <input
            type="date"
            id="date"
            name="meeting-date"
            value={date}
            min={dateNow}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="meeting-room-form__input-wrapper">
          <label htmlFor="time-start">Время с:</label>
          <input
            type="time"
            id="time-start"
            name="meeting-time-start"
            value={timeStart}
            min={minTimeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            required
          />
          <label htmlFor="time-end">&nbsp;по:</label>
          <input
            type="time"
            id="time-end"
            name="meeting-time-end"
            value={timeEnd}
            min={timeStart}
            max={"23:00"}
            onChange={(e) => setTimeEnd(e.target.value)}
            required
          />
        </div>

        <textarea
          name="comment"
          placeholder="Ваш комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="meeting-room-form__input-wrapper">
          <input type="submit" value="Отправить" />
          <input type="reset" onClick={handleReset} value="Очистить" />
        </div>

      </form>
    </section>
  );
}

export default MeetingRoomForm;
