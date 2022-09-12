using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _202209110629 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TDs",
                table: "QBs",
                newName: "Tds");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tds",
                table: "QBs",
                newName: "TDs");
        }
    }
}
