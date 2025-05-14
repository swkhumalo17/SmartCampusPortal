using SmartCampusPortal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Infrastructure.Persistence;

namespace SmartCampusPortal.Infrastructure.Seeders
{
    public static class TimetableSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.Timetables.AnyAsync()) return;

            var entries = new List<Timetable>
            {
                // 🟢 Advanced Diploma - Monday
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS301",
                    SubjectCode = "AD001",
                    SubjectName = "Web Programming",
                    LecturerName = "Dr. Ndlovu",
                    Venue = "Lab 2",
                    SessionTime = "08:30 - 11:30",
                    Day = "Monday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS302",
                    SubjectCode = "AD002",
                    SubjectName = "Database Systems",
                    LecturerName = "Mr. Moyo",
                    Venue = "Lab 3",
                    SessionTime = "11:30 - 14:30",
                    Day = "Monday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS303",
                    SubjectCode = "AD003",
                    SubjectName = "Networking",
                    LecturerName = "Ms. Dube",
                    Venue = "Room 1",
                    SessionTime = "14:30 - 17:30",
                    Day = "Monday"
                },

                // 🟢 Advanced Diploma - Tuesday
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS304",
                    SubjectCode = "AD004",
                    SubjectName = "Software Engineering",
                    LecturerName = "Mr. Sibanda",
                    Venue = "Lab 1",
                    SessionTime = "08:30 - 11:30",
                    Day = "Tuesday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS305",
                    SubjectCode = "AD005",
                    SubjectName = "Operating Systems",
                    LecturerName = "Dr. Ncube",
                    Venue = "Lab 2",
                    SessionTime = "11:30 - 14:30",
                    Day = "Tuesday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Advanced Diploma",
                    CourseCode = "ADCS306",
                    SubjectCode = "AD006",
                    SubjectName = "Information Systems",
                    LecturerName = "Mr. Mhlanga",
                    Venue = "Room 2",
                    SessionTime = "14:30 - 17:30",
                    Day = "Tuesday"
                },

                // 🟢 Postgraduate Diploma - Monday
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD401",
                    SubjectCode = "PG001",
                    SubjectName = "Research Methods",
                    LecturerName = "Prof. Sibanda",
                    Venue = "Main Hall",
                    SessionTime = "08:30 - 11:30",
                    Day = "Monday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD402",
                    SubjectCode = "PG002",
                    SubjectName = "Advanced Databases",
                    LecturerName = "Dr. Ndlovu",
                    Venue = "Lab 3",
                    SessionTime = "11:30 - 14:30",
                    Day = "Monday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD403",
                    SubjectCode = "PG003",
                    SubjectName = "Cyber Security",
                    LecturerName = "Mr. Dlamini",
                    Venue = "Lab 4",
                    SessionTime = "14:30 - 17:30",
                    Day = "Monday"
                },

                // 🟢 Postgraduate Diploma - Tuesday
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD404",
                    SubjectCode = "PG004",
                    SubjectName = "Project Management",
                    LecturerName = "Ms. Moyo",
                    Venue = "Room 5",
                    SessionTime = "08:30 - 11:30",
                    Day = "Tuesday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD405",
                    SubjectCode = "PG005",
                    SubjectName = "AI & Machine Learning",
                    LecturerName = "Dr. Chikukwa",
                    Venue = "AI Lab",
                    SessionTime = "11:30 - 14:30",
                    Day = "Tuesday"
                },
                new Timetable
                {
                    ProgrammeLevel = "Postgraduate Diploma",
                    CourseCode = "PGD406",
                    SubjectCode = "PG006",
                    SubjectName = "Big Data Analytics",
                    LecturerName = "Prof. Ncube",
                    Venue = "Data Lab",
                    SessionTime = "14:30 - 17:30",
                    Day = "Tuesday"
                }
            };

            await context.Timetables.AddRangeAsync(entries);
            await context.SaveChangesAsync();
        }
    }
}
