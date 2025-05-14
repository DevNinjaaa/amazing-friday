using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShare.Migrations
{
    /// <inheritdoc />
    public partial class fin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CarPosts_CarId",
                table: "CarPosts");

            migrationBuilder.DropColumn(
                name: "RentalPrice",
                table: "CarPosts");

            migrationBuilder.AlterColumn<int>(
                name: "Reviews",
                table: "Car",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_CarId",
                table: "CarPosts",
                column: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CarPosts_CarId",
                table: "CarPosts");

            migrationBuilder.AddColumn<decimal>(
                name: "RentalPrice",
                table: "CarPosts",
                type: "numeric",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Reviews",
                table: "Car",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarPosts_CarId",
                table: "CarPosts",
                column: "CarId",
                unique: true);
        }
    }
}
