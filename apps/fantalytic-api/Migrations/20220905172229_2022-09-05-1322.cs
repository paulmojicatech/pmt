using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _202209051322 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "rushingTds",
                table: "RBs",
                newName: "RushingTds");

            migrationBuilder.RenameColumn(
                name: "rushing20Yds",
                table: "RBs",
                newName: "Rushing20Yds");

            migrationBuilder.RenameColumn(
                name: "rushAttempts",
                table: "RBs",
                newName: "RushAttempts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RushingTds",
                table: "RBs",
                newName: "rushingTds");

            migrationBuilder.RenameColumn(
                name: "Rushing20Yds",
                table: "RBs",
                newName: "rushing20Yds");

            migrationBuilder.RenameColumn(
                name: "RushAttempts",
                table: "RBs",
                newName: "rushAttempts");
        }
    }
}
