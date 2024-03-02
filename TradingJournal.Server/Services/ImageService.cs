using Amazon.S3;
using Amazon.S3.Model;

namespace TradingJournal.Server.Services;

public class ImageService : IImageService
{
  private IAmazonS3 _s3Client;
  private readonly string _bucketName;

  public ImageService(IConfiguration configuration, IAmazonS3 amazonS3)
  {
    _s3Client = amazonS3;
    _bucketName = configuration.GetSection("AWS").GetValue<string>("Bucket");
  }

  private async Task<Dictionary<string, string>> createRequests(string[] imageKeys, HttpVerb verb)
  {
    var dict = new Dictionary<string, string>();
    foreach (var key in imageKeys)
    {
      var request = _s3Client.GetPreSignedURLAsync(new GetPreSignedUrlRequest
      {
        BucketName = _bucketName,
        Key = key,
        Verb = verb,
        Expires = DateTime.Now.AddDays(1),
        ContentType = "image/png"
      });
      var preSignedUrl = await request;
      dict.Add(key, preSignedUrl);
    }
    return dict;
  }

  public async Task<Dictionary<string, string>> GetUploadPreSignedUrls(string[] imageKeys)
  {
    return await createRequests(imageKeys, HttpVerb.PUT);
  }

  public async Task<Dictionary<string, string>> GetReadPreSignedUrls(string[] imageKeys)
  {
    return await createRequests(imageKeys, HttpVerb.GET);
  }
}
