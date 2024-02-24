using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameImageLocations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageLocations",
                table: "Trades",
                newName: "ImageKeys");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageKeys",
                table: "Trades",
                newName: "ImageLocations");
        }
    }
}
