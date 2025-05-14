using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartCampusPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Bookings",
                newName: "VenueCode");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Bookings",
                newName: "Purpose");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Bookings",
                newName: "StartTime");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Bookings",
                type: "char(36)",
                nullable: false,
                collation: "ascii_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Bookings",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "VenueCode",
                table: "Bookings",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Bookings",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Purpose",
                table: "Bookings",
                newName: "Title");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Bookings",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Bookings",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
