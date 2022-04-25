using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pmt_auth.Migrations
{
    public partial class tokenaddfirstname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Tokens",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Tokens");
        }
    }
}
