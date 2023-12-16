using Server.Model;

namespace Server.Providers;

public interface ITodoProvider
{
    public Task<List<TodoItem>> GetTodos(CancellationToken cancellationToken);
}
