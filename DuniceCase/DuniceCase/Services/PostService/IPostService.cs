namespace DuniceCase.Services.PostService
{
    public interface IPostService
    {
        Task<ServiceResponse<GetPostDto>> CreateOne(AddPostDto newPost);
        Task<ServiceResponse<GetPostDto>> GetOne(int id);
        Task<ServiceResponse<List<GetPostDto>>> GetAll();
        Task<ServiceResponse<GetPostDto>> UpdateOne(int id, UpdatePostDto updatedPost);
        Task<ServiceResponse<List<GetPostDto>>> DeleteOne(int id);
    }
}
