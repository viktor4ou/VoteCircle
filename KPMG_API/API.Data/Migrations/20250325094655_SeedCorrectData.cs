using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedCorrectData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreateOn",
                table: "VotingSessions",
                newName: "CreatedOn");

            migrationBuilder.UpdateData(
                table: "VotingSessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2025, 3, 24, 21, 33, 37, 0, DateTimeKind.Utc));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "VotingSessions",
                newName: "CreateOn");

            migrationBuilder.UpdateData(
                table: "VotingSessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreateOn",
                value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
