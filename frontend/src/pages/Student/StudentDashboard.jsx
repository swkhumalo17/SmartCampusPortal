import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "../../components/Card";
import { BarChart3, CalendarDays, School, NotebookPen } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const sessions = ["08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00"];

const sampleTimetable = [
  { day: "Monday", sessionTime: "08:00-10:00", subjectName: "Mathematics", venue: "Room A", courseCode: "MATH101" },
  { day: "Monday", sessionTime: "10:00-12:00", subjectName: "Physics", venue: "Room B", courseCode: "PHYS101" },
  { day: "Tuesday", sessionTime: "12:00-14:00", subjectName: "Chemistry", venue: "Room C", courseCode: "CHEM101" },
  { day: "Wednesday", sessionTime: "08:00-10:00", subjectName: "Mathematics", venue: "Room A", courseCode: "MATH101" },
  { day: "Wednesday", sessionTime: "10:00-12:00", subjectName: "Biology", venue: "Room D", courseCode: "BIO101" },
  { day: "Thursday", sessionTime: "08:00-10:00", subjectName: "English", venue: "Room E", courseCode: "ENG101" },
  { day: "Friday", sessionTime: "14:00-16:00", subjectName: "Computer Science", venue: "Lab 1", courseCode: "CS101" },
];

const totalBookings = 15;
const issuesReported = 3;

const sortedTimetable = sampleTimetable.sort((a, b) => {
  const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
  if (dayOrder !== 0) return dayOrder;
  return sessions.indexOf(a.sessionTime) - sessions.indexOf(b.sessionTime);
});

// Weekly Subjects Count
const weeklySubjects = [...new Set(sampleTimetable.map((s) => s.subjectName))].length;

// Bar Chart Data
const sessionCountByDay = days.map((day) => ({
  day,
  sessions: sampleTimetable.filter((s) => s.day === day).length,
}));

const bookingsVsIssuesData = [
  { name: "Bookings", value: totalBookings },
  { name: "Issues", value: issuesReported },
];

const sessionCountByTime = sessions.map((session) => ({
  session,
  count: sampleTimetable.filter((s) => s.sessionTime === session).length,
}));

const subjectLoad = Object.entries(
  sortedTimetable.reduce((acc, { subjectName }) => {
    acc[subjectName] = (acc[subjectName] || 0) + 1;
    return acc;
  }, {})
).map(([subject, sessions]) => ({ subject, sessions }));

// Upcoming classes logic
const upcomingClasses = sortedTimetable
  .filter((session) => {
    const now = new Date();
    const daysMap = {
      Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6, Sunday: 0,
    };
    const sessionDay = daysMap[session.day];
    const sessionTimeParts = session.sessionTime.split("-")[0].split(":");
    const sessionHour = parseInt(sessionTimeParts[0], 10);
    const sessionMinute = parseInt(sessionTimeParts[1], 10);

    const sessionDate = new Date();
    sessionDate.setDate(now.getDate() + ((7 + sessionDay - now.getDay()) % 7));
    sessionDate.setHours(sessionHour, sessionMinute, 0, 0);

    return sessionDate > now;
  })
  .sort((a, b) => {
    const getDateTime = (s) => {
      const daysMap = {
        Monday: 1, Tuesday: 2, Wednesday: 3,
        Thursday: 4, Friday: 5, Saturday: 6, Sunday: 0,
      };
      const [hour, minute] = s.sessionTime.split("-")[0].split(":").map(Number);
      const date = new Date();
      date.setDate(date.getDate() + ((7 + daysMap[s.day] - date.getDay()) % 7));
      date.setHours(hour, minute, 0, 0);
      return date;
    };
    return getDateTime(a) - getDateTime(b);
  })
  .slice(0, 5);

const DashboardCard = ({ icon: Icon, title, value }) => (
  <Card className="flex items-center p-4 shadow-md border">
    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-4">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-lg font-bold">{value}</h3>
    </div>
  </Card>
);

const ChartCard = ({ title, children }) => (
  <Card className="p-4 shadow-md border">
    <h2 className="text-md font-semibold text-gray-700 mb-2">{title}</h2>
    <CardContent className="p-0">{children}</CardContent>
  </Card>
);

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard icon={BarChart3} title="Total Bookings" value={totalBookings} />
        <DashboardCard icon={NotebookPen} title="Issues Reported" value={issuesReported} />
        <DashboardCard icon={School} title="Weekly Subjects" value={weeklySubjects} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Weekly Sessions by Day">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sessionCountByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Bookings vs Issues">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingsVsIssuesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sessions by Time">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sessionCountByTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject Load">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectLoad}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Upcoming Classes</h2>
        <ul className="divide-y">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((session, idx) => (
              <li key={idx} className="py-3 flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold">{session.subjectName}</p>
                  <p className="text-xs text-gray-500">
                    {session.day} | {session.sessionTime} | {session.venue}
                  </p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                  {session.courseCode}
                </span>
              </li>
            ))
          ) : (
            <li className="py-3 text-sm text-gray-500">No upcoming classes found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
