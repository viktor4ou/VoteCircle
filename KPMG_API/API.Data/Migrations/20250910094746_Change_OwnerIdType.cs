using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Change_OwnerIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "VotingSessions",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Entities",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 1,
                column: "OwnerId",
                value: "a9da4fe1-3005-4148-a69c-e1f61b89a86e");

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 2,
                column: "OwnerId",
                value: "a9da4fe1-3005-4148-a69c-e1f61b89a86e");

            migrationBuilder.UpdateData(
                table: "VotingSessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "OwnerId",
                value: "a9da4fe1-3005-4148-a69c-e1f61b89a86e");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "OwnerId",
                table: "VotingSessions",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "OwnerId",
                table: "Entities",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 1,
                column: "OwnerId",
                value: new Guid("a9da4fe1-3005-4148-a69c-e1f61b89a86e"));

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 2,
                column: "OwnerId",
                value: new Guid("a9da4fe1-3005-4148-a69c-e1f61b89a86e"));

            migrationBuilder.UpdateData(
                table: "VotingSessions",
                keyColumn: "Id",
                keyValue: 1,
                column: "OwnerId",
                value: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
