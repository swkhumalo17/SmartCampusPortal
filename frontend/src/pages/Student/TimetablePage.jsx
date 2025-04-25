import React, { useState } from 'react';

const TimetablePage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const timetable = {
    Monday: [
      { time: '08:00 - 09:00', subject: 'Mathematics I', room: 'C-Lab 01' },
      { time: '11:00 - 12:00', subject: 'Computer Science', room: 'Study Room 3' },
    ],
    Tuesday: [
      { time: '10:00 - 11:00', subject: 'English Communication', room: 'Lecture Hall A2' },
    ],
    Wednesday: [],
    Thursday: [
      { time: '14:00 - 15:00', subject: 'Programming I', room: 'C-Lab 02' },
    ],
    Friday: [],
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">My Timetable</h1>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {Object.keys(timetable).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md border ${
                selectedDay === day
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-800 border-gray-300'
              } hover:bg-gray-800 hover:text-white transition`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {timetable[selectedDay].length === 0 ? (
            <div className="text-center text-gray-600">No classes scheduled for {selectedDay} 📭</div>
          ) : (
            timetable[selectedDay].map((entry, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800">{entry.subject}</h3>
                <p className="text-sm text-gray-600">🕒 {entry.time}</p>
                <p className="text-sm text-gray-600">📍 {entry.room}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
