import React from 'react';

const timetableData = {
  advancedDiploma: [
    {
      testTime: "08:30 - 11:30",
      course: "ADRS20",
      subject: "IDA117V",
      subjectName: "Introduction to Data Science",
      lecturer: "M Lusinga",
      numStuds: 142,
      testVenues: ["10-138 lab", "10-L44 lab"],
      comments: ""
    },
    {
      testTime: "08:30 - 11:30",
      course: "ADMC20",
      subject: "IMD117V",
      subjectName: "Instructional Multimedia Design",
      lecturer: "Dr. E Van Wyk",
      numStuds: 11,
      testVenues: ["14-G108 (120)"],
      comments: ""
    },
  ],
  postgraduateDiploma: [
    {
      testTime: "08:30 - 11:30",
      course: "PDRS21",
      subject: "ACX118G",
      subjectName: "Algorithms and Complexity",
      lecturer: "S Mhlanga",
      numStuds: 18,
      testVenues: ["10-G28 lab (55)"],
      comments: ""
    },
    {
      testTime: "08:30 - 11:30",
      course: "PDMC21/PDRS21",
      subject: "RMR118G",
      subjectName: "Research Methodologies",
      lecturer: "Dr. R Hans",
      numStuds: 1,
      testVenues: ["14-G108 (120)"],
      comments: ""
    },
  ],
};

const LecturerTimetable = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lecturer Timetable</h1>

      {/* Advanced Diploma Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Diploma</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Test Time</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Subject Name</th>
              <th className="px-4 py-2 border">Lecturer</th>
              <th className="px-4 py-2 border">No. of Students</th>
              <th className="px-4 py-2 border">Test Venue(s)</th>
              <th className="px-4 py-2 border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.advancedDiploma.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.testTime}</td>
                <td className="px-4 py-2 border">{item.course}</td>
                <td className="px-4 py-2 border">{item.subject}</td>
                <td className="px-4 py-2 border">{item.subjectName}</td>
                <td className="px-4 py-2 border">{item.lecturer}</td>
                <td className="px-4 py-2 border">{item.numStuds}</td>
                <td className="px-4 py-2 border">{item.testVenues.join(", ")}</td>
                <td className="px-4 py-2 border">{item.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Postgraduate Diploma Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Postgraduate Diploma</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Test Time</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Subject Name</th>
              <th className="px-4 py-2 border">Lecturer</th>
              <th className="px-4 py-2 border">No. of Students</th>
              <th className="px-4 py-2 border">Test Venue(s)</th>
              <th className="px-4 py-2 border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.postgraduateDiploma.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.testTime}</td>
                <td className="px-4 py-2 border">{item.course}</td>
                <td className="px-4 py-2 border">{item.subject}</td>
                <td className="px-4 py-2 border">{item.subjectName}</td>
                <td className="px-4 py-2 border">{item.lecturer}</td>
                <td className="px-4 py-2 border">{item.numStuds}</td>
                <td className="px-4 py-2 border">{item.testVenues.join(", ")}</td>
                <td className="px-4 py-2 border">{item.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturerTimetable;
