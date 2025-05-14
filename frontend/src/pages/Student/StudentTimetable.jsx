import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import API_ENDPOINTS from "../apiEndpoints";
import { AuthContext } from "../../context/AuthContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const getColorClass = (subject) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
  ];
  const hash = subject.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const StudentTimetable = () => {
  const { auth } = useContext(AuthContext);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(API_ENDPOINTS.GET_TIMETABLE_BY_LEVEL(auth.levelOfStudy));
        if (res.data?.isValid) {
          setTimetable(res.data.data);
        } else {
          setError("No timetable found.");
        }
      } catch (err) {
        console.error("Failed to load timetable", err);
        setError("Something went wrong while loading your timetable.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.levelOfStudy) {
      fetchTimetable();
    }
  }, [auth]);

  // Generate unique sorted time slots dynamically
  const uniqueTimeSlots = Array.from(
    new Set(timetable.map((session) => session.sessionTime))
  ).sort();

  // Get sessions per cell
  const getSessionsFor = (day, slot) => {
    return timetable.filter(
      (item) => item.day === day && item.sessionTime === slot
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {auth.fullName ? `${auth.fullName}'s` : "Your"} Weekly Timetable
      </h1>

      {loading ? (
        <div className="text-gray-500">Loading timetable...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-auto rounded-xl bg-white shadow border border-gray-100">
          <div
            className="grid min-w-max"
            style={{
              gridTemplateColumns: "120px repeat(5, 1fr)",
              gridAutoRows: "auto",
            }}
          >
            {/* Header Row */}
            <div className="bg-gray-100 border-r border-b p-3 text-sm font-semibold text-gray-700">Time</div>
            {days.map((day) => (
              <div
                key={day}
                className="bg-gray-100 border-b text-sm font-semibold text-center p-3 text-gray-700"
              >
                {day}
              </div>
            ))}

            {/* Time Rows */}
            {uniqueTimeSlots.map((slot) => (
              <React.Fragment key={slot}>
                <div className="border-r border-b px-3 py-2 text-sm font-medium text-gray-600">
                  {slot}
                </div>
                {days.map((day) => {
                  const sessions = getSessionsFor(day, slot);
                  return (
                    <div key={`${day}-${slot}`} className="border-b p-2 space-y-2">
                      {sessions.length > 0 ? (
                        sessions.map((session, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg px-3 py-2 text-xs font-medium shadow-sm ${getColorClass(
                              session.subjectName
                            )}`}
                          >
                            <div className="font-semibold truncate">{session.subjectName}</div>
                            <div className="text-[11px]">{session.lecturerName}</div>
                            <div className="text-[11px]">{session.courseCode}</div>
                            <div className="text-[11px]">{session.venue}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-300 text-center">—</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTimetable;