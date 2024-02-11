namespace TradingJournal.Server.Models;

public enum Direction
{
  Long,
  Short
}

public class Trade
{
  public int ID {  get; set; }
  public string Pair { get; set; }
  public long PositionSize { get; set; }
  public Direction Direction { get; set; }
  public DateTime EntryTime { get; set; }
  public double Entry {  get; set; }
  public double StopLoss { get; set; }
  public double TakeProfit { get; set; }
  public string RiskReward { get; set; }
  public double RiskPercent { get; set; }
  public DateTime? ExitTime { get; set; }
  public double? Exit { get; set; }
  public string? Strategy { get; set; }
  public double? ProfitOrLoss { get; set; }
  public string? Notes { get; set; }
  public string[]? ImageLocations { get; set; }

  public Trade(string pair, string riskReward)
  {
    (Pair, RiskReward) = (pair, riskReward);
  }
}
