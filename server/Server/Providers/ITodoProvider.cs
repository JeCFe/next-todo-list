using Server.Context;
using Server.Model;

namespace Server.Providers;

public interface ITodoProvider
{
    public Task<List<TodoItem>> GetTodos(
        TodoDb dbContext,
        IUserContext userContext,
        CancellationToken cancellationToken
    );
}
