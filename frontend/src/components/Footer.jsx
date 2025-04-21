import React from "react";

export default function Footer() {
  return (
    <footer className="bg-tutBlack text-white mt-12 py-6 px-4">
      <div className="max-w-7xl mx-auto text-sm flex justify-between flex-wrap gap-6">
        <div>
          <p className="font-bold">About</p>
          <p>Tshwane University of Technology</p>
        </div>
        <div>
          <p className="font-bold">Contact</p>
          <p>Email: support@smartcampus.edu</p>
          <p>Tel: 086 000 0000</p>
        </div>
        <div>
          <p className="font-bold">Quick Links</p>
          <p><a href="/booking" className="hover:underline">Book a Room</a></p>
          <p><a href="/timetable" className="hover:underline">View Timetable</a></p>
        </div>
      </div>
    </footer>
  );
}
