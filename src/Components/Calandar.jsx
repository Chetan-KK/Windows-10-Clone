// Calendar.js
import React, { useState } from 'react';
import './css/Calandar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>◀</button>
        <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}

        {Array.from({ length: startDayOfMonth }).map((_, index) => (
          <div key={index} className="calendar-day empty"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div key={index} className={`calendar-day ${index + 1 === currentDate.getDate() ? 'selected' : ''}`}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
