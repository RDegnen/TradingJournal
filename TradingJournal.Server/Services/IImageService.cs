namespace TradingJournal.Server.Services;

public interface IImageService
{
  Task<Dictionary<string, string>> GetUploadPreSignedUrls(string[] imageKeys);

  Task<Dictionary<string, string>> GetReadPreSignedUrls(string[] imageKeys);
}
