using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trades",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Pair = table.Column<string>(type: "TEXT", nullable: false),
                    PositionSize = table.Column<long>(type: "INTEGER", nullable: false),
                    Direction = table.Column<int>(type: "INTEGER", nullable: false),
                    EntryTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Entry = table.Column<double>(type: "REAL", nullable: false),
                    StopLoss = table.Column<double>(type: "REAL", nullable: false),
                    TakeProfit = table.Column<double>(type: "REAL", nullable: false),
                    RiskReward = table.Column<string>(type: "TEXT", nullable: false),
                    RiskPercent = table.Column<double>(type: "REAL", nullable: false),
                    ExitTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Exit = table.Column<double>(type: "REAL", nullable: true),
                    Strategy = table.Column<string>(type: "TEXT", nullable: true),
                    ProfitOrLoss = table.Column<double>(type: "REAL", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trades", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trades");
        }
    }
}
