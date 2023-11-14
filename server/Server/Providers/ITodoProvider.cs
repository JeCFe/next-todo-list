using Server.Model;

namespace Server.Providers;

public interface ITodoProvider
{
    public Task AddTodo(TodoContext dbContext,string userId, TodoItem todoItem, CancellationToken cancellationToken);
    public Task<List<TodoItem>> GetTodos(TodoContext dbContext, string userId, CancellationToken cancellationToken);
}