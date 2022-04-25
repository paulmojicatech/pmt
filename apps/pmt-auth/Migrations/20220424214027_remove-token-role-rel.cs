using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pmt_auth.Migrations
{
    public partial class removetokenrolerel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TokenRoles");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TokenRoles",
                columns: table => new
                {
                    RolesRoleId = table.Column<int>(type: "integer", nullable: false),
                    TokensId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TokenRoles", x => new { x.RolesRoleId, x.TokensId });
                    table.ForeignKey(
                        name: "FK_TokenRoles_Roles_RolesRoleId",
                        column: x => x.RolesRoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TokenRoles_Tokens_TokensId",
                        column: x => x.TokensId,
                        principalTable: "Tokens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TokenRoles_TokensId",
                table: "TokenRoles",
                column: "TokensId");
        }
    }
}
