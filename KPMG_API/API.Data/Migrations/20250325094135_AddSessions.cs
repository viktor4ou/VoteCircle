using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSessions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VotingSessionId",
                table: "Entities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "VotingSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ScheduledUntil = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreateOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Result = table.Column<decimal>(type: "numeric", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingSessions", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 1,
                column: "VotingSessionId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entities",
                keyColumn: "Id",
                keyValue: 2,
                column: "VotingSessionId",
                value: 1);

            migrationBuilder.InsertData(
                table: "VotingSessions",
                columns: new[] { "Id", "CreateOn", "Description", "IsActive", "Result", "ScheduledUntil", "Title" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "We need to change the water pipe", false, 0m, new DateTime(2025, 3, 24, 21, 33, 37, 0, DateTimeKind.Utc), "New water pipe" });

            migrationBuilder.CreateIndex(
                name: "IX_Entities_VotingSessionId",
                table: "Entities",
                column: "VotingSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entities_VotingSessions_VotingSessionId",
                table: "Entities",
                column: "VotingSessionId",
                principalTable: "VotingSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entities_VotingSessions_VotingSessionId",
                table: "Entities");

            migrationBuilder.DropTable(
                name: "VotingSessions");

            migrationBuilder.DropIndex(
                name: "IX_Entities_VotingSessionId",
                table: "Entities");

            migrationBuilder.DropColumn(
                name: "VotingSessionId",
                table: "Entities");
        }
    }
}
