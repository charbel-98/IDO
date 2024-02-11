using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using TodoApi.Data;
using TodoApi.DTOs;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
           return Ok(await _context.TodoItems.ToListAsync());
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
            var todo = new Todo()
            {
                Id = Guid.NewGuid(),
                Title = addTodoRequest.Title,
                IsCompleted = addTodoRequest.IsCompleted,
                IsInProgress = addTodoRequest.IsInProgress,
                Importance = addTodoRequest.Importance,
                DueDate = addTodoRequest.DueDate,
                EstimatedTime = addTodoRequest.EstimatedTime
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