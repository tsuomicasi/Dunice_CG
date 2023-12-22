using Microsoft.Extensions.Hosting;
namespace DuniceCase.Services.PostService
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PostService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetPostDto>> CreateOne(AddPostDto newPost)
        {
            var serviceResponse = new ServiceResponse<GetPostDto>();
            var post = _mapper.Map<Post>(newPost);
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<GetPostDto>(post);
            serviceResponse.Success = true;
            serviceResponse.Message = "Post successfully created";
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetPostDto>>> DeleteOne(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetPostDto>>();

            try
            {

                var post = await _context.Posts.FindAsync(id) ?? throw new Exception($"Post with Id:{id} not found.");
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
                var posts = await _context.Posts.ToListAsync();
                serviceResponse.Data = posts.Select(c => _mapper.Map<GetPostDto>(c)).ToList();
                serviceResponse.Success = true;
                serviceResponse.Message = "Post successfully deleted";

            }
            catch (Exception ex)
            {

                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;

            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetPostDto>>> GetAll()
        {
            var serviceResponse = new ServiceResponse<List<GetPostDto>>();
            var posts = await _context.Posts.ToListAsync();
            serviceResponse.Data = posts.Select(c => _mapper.Map<GetPostDto>(c)).ToList();
            serviceResponse.Success = true;
            serviceResponse.Message = "Posts received successfully";
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetPostDto>> GetOne(int id)
        {
            var serviceResponse = new ServiceResponse<GetPostDto>();

            try
            {

                var post = await _context.Posts.FindAsync(id) ?? throw new Exception($"Post with Id:{id} not found.");
                serviceResponse.Data = _mapper.Map<GetPostDto>(post);
                serviceResponse.Success = true;
                serviceResponse.Message = "Post received successfully";

            }
            catch (Exception ex)
            {

                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;

        }

        public async Task<ServiceResponse<GetPostDto>> UpdateOne(int id, UpdatePostDto updatedPost)
        {
            var serviceResponse = new ServiceResponse<GetPostDto>();

            try
            {

                var postToUpdate = await _context.Posts.FindAsync(id) ?? throw new Exception($"Post with Id:{id} not found.");

                foreach (var property in typeof(UpdatePostDto).GetProperties())
                {
                    var updatedValue = property.GetValue(updatedPost);
                    if (updatedValue != null && !string.IsNullOrEmpty(updatedValue.ToString()))
                    {
                        var postProperty = postToUpdate.GetType().GetProperty(property.Name);
                        postProperty.SetValue(postToUpdate, updatedValue);
                    }
                }
                _context.Posts.Update(postToUpdate);
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetPostDto>(postToUpdate);
                serviceResponse.Success = true;
                serviceResponse.Message = "Post successfully updated";
            }
            catch (Exception ex)
            {

                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}
