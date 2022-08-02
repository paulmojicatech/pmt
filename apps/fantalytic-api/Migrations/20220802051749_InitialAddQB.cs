using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class InitialAddQB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ints",
                table: "QBs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PassingYds",
                table: "QBs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PassingYdsPerAttempt",
                table: "QBs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TDs",
                table: "QBs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "QBs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ints",
                table: "QBs");

            migrationBuilder.DropColumn(
                name: "PassingYds",
                table: "QBs");

            migrationBuilder.DropColumn(
                name: "PassingYdsPerAttempt",
                table: "QBs");

            migrationBuilder.DropColumn(
                name: "TDs",
                table: "QBs");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "QBs");
        }
    }
}
