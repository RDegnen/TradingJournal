namespace TradingJournal.Server.Models;

public class ImageDTO
{
  public string FileName { get; set; }
  public string PreSignedUrl { get; set; }

  public ImageDTO(string fileName, string preSignedUrl)
  {
    FileName = fileName;
    PreSignedUrl = preSignedUrl;
  }
}
