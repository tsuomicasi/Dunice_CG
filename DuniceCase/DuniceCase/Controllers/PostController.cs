using DuniceCase.Dtos.PostDtos;
using DuniceCase.Services.PostService;
using Microsoft.AspNetCore.Mvc;

namespace DuniceCase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        public IPostService _postService { get; }
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpPost]
        public async Task<ActionResult<GetPostDto>> CreateOne(AddPostDto newPost)
        {
            return Ok(await _postService.CreateOne(newPost));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GetPostDto>> GetOne(int id)
        {
            return Ok(await _postService.GetOne(id));
        }
        [HttpGet]
        public async Task<ActionResult<List<GetPostDto>>> GetAll()
        {
            return Ok(await _postService.GetAll());
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<GetPostDto>> UpdateOne(int id, UpdatePostDto updatedPost)
        {
            return Ok(await _postService.UpdateOne(id, updatedPost));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<GetPostDto>>> DeleteOne(int id)
        {
            return Ok(await _postService.DeleteOne(id));
        }
    }
}
