using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShare.Migrations
{
    /// <inheritdoc />
    public partial class final : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_CarPosts_CarPostId",
                table: "Requests");

            migrationBuilder.AlterColumn<int>(
                name: "CarPostId",
                table: "Requests",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_CarPosts_CarPostId",
                table: "Requests",
                column: "CarPostId",
                principalTable: "CarPosts",
                principalColumn: "CarPostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_CarPosts_CarPostId",
                table: "Requests");

            migrationBuilder.AlterColumn<int>(
                name: "CarPostId",
                table: "Requests",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_CarPosts_CarPostId",
                table: "Requests",
                column: "CarPostId",
                principalTable: "CarPosts",
                principalColumn: "CarPostId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
