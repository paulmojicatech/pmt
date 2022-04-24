using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pmt_auth.Migrations
{
    public partial class addlastlogintoken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogin",
                table: "Tokens",
                type: "timestamp with time zone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastLogin",
                table: "Tokens");
        }
    }
}
