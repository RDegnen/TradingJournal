namespace TradingJournal.Server.Models;

public class ImageDTO
{
  public string PreSignedUrl { get; set; }

  public ImageDTO(string preSignedUrl)
  {
    PreSignedUrl = preSignedUrl;
  }
}
