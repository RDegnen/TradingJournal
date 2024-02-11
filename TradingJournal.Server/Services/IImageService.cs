namespace TradingJournal.Server.Services;

public interface IImageService
{
  Task<string[]> GetUploadPreSignedUrls(string[] imageKeys);

  Task<string[]> GetReadPreSignedUrls(string[] imageKeys);
}
