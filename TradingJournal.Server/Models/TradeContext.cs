using Microsoft.EntityFrameworkCore;

namespace TradingJournal.Server.Models;

public class TradeContext : DbContext
{
  public TradeContext(DbContextOptions<TradeContext> options) : base(options) { }

  public DbSet<Trade> Trades { get; set; } = null!;
}
