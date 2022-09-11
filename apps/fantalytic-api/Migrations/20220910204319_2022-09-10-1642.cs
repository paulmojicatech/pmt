using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pmt.FantalyticApi.Migrations
{
    public partial class _202209101642 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WRs_TEs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Player = table.Column<string>(type: "text", nullable: false),
                    Receptions = table.Column<int>(type: "integer", nullable: false),
                    ReceivingYds = table.Column<int>(type: "integer", nullable: false),
                    ReceivingTds = table.Column<int>(type: "integer", nullable: false),
                    Receiving20Plus = table.Column<int>(type: "integer", nullable: false),
                    Receiving40Plus = table.Column<int>(type: "integer", nullable: false),
                    ReceivingTargets = table.Column<int>(type: "integer", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Week = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WRs_TEs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WRs_TEs");
        }
    }
}
