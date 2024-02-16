using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using TodoApi.Data;
using TodoApi.DTOs;

namespace TodoApi.Controllers
{
    [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoApiDbContext _context;

        public TodoController(TodoApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            //find the user id from the authorization token
            var userId = Guid.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
            var todos = await _context.TodoItems.Where(todo => todo.UserId == userId).ToListAsync();
            return Ok(todos);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTodoById([FromRoute] Guid id){
            var todo = await _context.TodoItems.FirstOrDefaultAsync(todo => todo.Id == id);
            if(todo == null){
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(AddTodoDto addTodoRequest)
        {
            //the new toto should be linked to a user
            var userId = Guid.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
            var todo = new Todo()
            {
                Id = Guid.NewGuid(),
                Title = addTodoRequest.Title,
                IsCompleted = addTodoRequest.IsCompleted,
                IsInProgress = addTodoRequest.IsInProgress,
                Importance = addTodoRequest.Importance,
                DueDate = addTodoRequest.DueDate,
                EstimatedTime = addTodoRequest.EstimatedTime,
                Category = addTodoRequest.Category,
                UserId = userId
            };
           await _context.TodoItems.AddAsync(todo);
           await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, AddTodoDto updateTodoRequest)
        {
            var todo = await _context.TodoItems.FirstOrDefaultAsync(todo => todo.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            todo.Title = updateTodoRequest.Title;
            todo.IsCompleted = updateTodoRequest.IsCompleted;
            todo.IsInProgress = updateTodoRequest.IsInProgress;
            todo.Importance = updateTodoRequest.Importance;
            todo.DueDate = updateTodoRequest.DueDate;
            todo.EstimatedTime = updateTodoRequest.EstimatedTime;
            todo.Category = updateTodoRequest.Category;
            await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTodoById([FromRoute] Guid id)
        {
            var todo = await _context.TodoItems.FirstOrDefaultAsync(todo => todo.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}