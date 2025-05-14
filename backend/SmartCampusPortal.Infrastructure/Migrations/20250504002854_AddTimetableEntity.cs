using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartCampusPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddTimetableEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Timetables");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Timetables");

            migrationBuilder.DropColumn(
                name: "StudentCount",
                table: "Timetables");

            migrationBuilder.RenameColumn(
                name: "Session",
                table: "Timetables",
                newName: "SubjectCode");

            migrationBuilder.RenameColumn(
                name: "Lecturer",
                table: "Timetables",
                newName: "SessionTime");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Timetables",
                newName: "ProgrammeLevel");

            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "Timetables",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "LecturerName",
                table: "Timetables",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "Timetables");

            migrationBuilder.DropColumn(
                name: "LecturerName",
                table: "Timetables");

            migrationBuilder.RenameColumn(
                name: "SubjectCode",
                table: "Timetables",
                newName: "Session");

            migrationBuilder.RenameColumn(
                name: "SessionTime",
                table: "Timetables",
                newName: "Lecturer");

            migrationBuilder.RenameColumn(
                name: "ProgrammeLevel",
                table: "Timetables",
                newName: "Comment");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Timetables",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Timetables",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "StudentCount",
                table: "Timetables",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
