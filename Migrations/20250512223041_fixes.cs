using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShare.Migrations
{
    /// <inheritdoc />
    public partial class fixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Feedbacks",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "CarType",
                table: "Car",
                newName: "Category");

            migrationBuilder.AlterColumn<decimal>(
                name: "RentalPrice",
                table: "CarPosts",
                type: "numeric",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Car",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Doors",
                table: "Car",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FuelType",
                table: "Car",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Car",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LicensePlate",
                table: "Car",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PricePerDay",
                table: "Car",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Car",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Reviews",
                table: "Car",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Seats",
                table: "Car",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Doors",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "FuelType",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "LicensePlate",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "PricePerDay",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Reviews",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "Seats",
                table: "Car");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "Feedbacks",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Car",
                newName: "CarType");

            migrationBuilder.AlterColumn<decimal>(
                name: "RentalPrice",
                table: "CarPosts",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "numeric",
                oldNullable: true);
        }
    }
}
