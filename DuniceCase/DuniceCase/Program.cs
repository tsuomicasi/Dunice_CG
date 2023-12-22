global using DuniceCase.Dtos.EventDtos;
global using DuniceCase.Dtos.PostDtos;
global using DuniceCase.Services.EventService;
global using DuniceCase.Services.PostService;
global using AutoMapper;
global using DuniceCase.Data;
global using Microsoft.EntityFrameworkCore;
global using DuniceCase.Entities.Event;
global using DuniceCase.Entities.Post;
global using DuniceCase.Entities.ServiceResponse;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddDbContext<DataContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IPostService, PostService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();