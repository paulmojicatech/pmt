using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _2022091657 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Week",
                table: "Defenses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Defenses",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Week",
                table: "Defenses");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Defenses");
        }
    }
}
