using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddImageLocations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageLocations",
                table: "Trades",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageLocations",
                table: "Trades");
        }
    }
}
