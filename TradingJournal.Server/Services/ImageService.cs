using Amazon;
using Amazon.S3;
using Amazon.S3.Model;

namespace TradingJournal.Server.Services;

public class ImageService : IImageService
{
  private AmazonS3Client _s3Client;
  private readonly string _bucketName;

  public ImageService(IConfiguration configuration)
  {
    _s3Client = new AmazonS3Client();
    //_bucketName = configuration.GetSection("AWS").GetValue(string, "Bucket");
  }

  private List<Task<string>> createRequests(string[] imageKeys, HttpVerb verb)
  {
    var requests = new List<Task<string>>();
    foreach (var key in imageKeys)
    {
      var request = _s3Client.GetPreSignedURLAsync(new GetPreSignedUrlRequest
      {
        BucketName = _bucketName,
        Key = key,
        Verb = verb,
        Expires = DateTime.Now.AddDays(1)
      });
      requests.Add(request);
    }
    return requests;
  }

  public async Task<string[]> GetUploadPreSignedUrls(string[] imageKeys)
  {
    var requests = createRequests(imageKeys, HttpVerb.PUT);
    return await Task.WhenAll(requests);
  }

  public async Task<string[]> GetReadPreSignedUrls(string[] imageKeys)
  {
    var requests = createRequests(imageKeys, HttpVerb.GET);
    return await Task.WhenAll(requests);
  }
}
