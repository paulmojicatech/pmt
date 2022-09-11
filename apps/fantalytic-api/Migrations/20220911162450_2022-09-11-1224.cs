using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _202209111224 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Defenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Team = table.Column<string>(type: "text", nullable: false),
                    RushYdsAllowed = table.Column<int>(type: "integer", nullable: false),
                    YdsPerCarry = table.Column<float>(type: "real", nullable: false),
                    RushTdsAllowed = table.Column<int>(type: "integer", nullable: false),
                    CompletionPctAllowed = table.Column<float>(type: "real", nullable: false),
                    PassYdsAllowed = table.Column<int>(type: "integer", nullable: false),
                    Ints = table.Column<int>(type: "integer", nullable: false),
                    Sacks = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Defenses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Defenses");
        }
    }
}
