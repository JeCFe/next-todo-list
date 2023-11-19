using Server.Model;

namespace Server.Providers;

public interface ITodoProvider
{
    public Task AddTodo(
        TodoDb dbContext,
        string userId,
        TodoItem todoItem,
        CancellationToken cancellationToken
    );
    public Task<List<TodoItem>> GetTodos(
        TodoDb dbContext,
        string userId,
        CancellationToken cancellationToken
    );
}
