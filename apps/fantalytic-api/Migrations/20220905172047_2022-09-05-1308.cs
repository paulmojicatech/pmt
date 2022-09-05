using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _202209051308 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RBs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Player = table.Column<string>(type: "text", nullable: false),
                    RushingYds = table.Column<int>(type: "integer", nullable: false),
                    rushAttempts = table.Column<int>(type: "integer", nullable: false),
                    rushingTds = table.Column<int>(type: "integer", nullable: false),
                    rushing20Yds = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RBs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RBs");
        }
    }
}
