using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TradingJournal.Server.Models;
using TradingJournal.Server.Services;

namespace TradingJournal.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ImagesController : ControllerBase
  {
    private IImageService _imageService;

    public ImagesController(IImageService imageService)
    {
      _imageService = imageService;
    }

    [HttpGet("GetUploadPreSignedUrls")]
    public async Task<ActionResult<IEnumerable<ImageDTO>>> GetUploadPreSignedUrls([FromQuery] string[] imageKeys)
    {
      var urls = await _imageService.GetUploadPreSignedUrls(imageKeys);
      var dtos = urls.Select(url => new ImageDTO(url.Key, url.Value));
      return Ok(dtos);
    }

    [HttpGet("GetReadPreSignedUrls")]
    public async Task<ActionResult<IEnumerable<ImageDTO>>> GetReadPreSignedUrls([FromQuery] string[] imageKeys)
    {
      var urls = await _imageService.GetReadPreSignedUrls(imageKeys);
      var dtos = urls.Select(url => new ImageDTO(url.Key, url.Value));
      return Ok(dtos);
    }
  }
}
