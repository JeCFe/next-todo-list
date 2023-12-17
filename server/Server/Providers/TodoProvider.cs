using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Exceptions;
using Server.Model;

namespace Server.Providers;

public class TodoProvider : ITodoProvider
{
    private readonly TodoDb _dbContext;
    private readonly IUserContext _userContext;

    public TodoProvider(TodoDb dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    public async Task<List<TodoItem>> GetTodos(CancellationToken cancellationToken)
    {
        var userId = _userContext.UserId ?? throw new InvalidUserException();
        return await _dbContext
                .Todos
                .Where(x => x.UserId == userId)
                .Select(
                    x =>
                        new TodoItem
                        {
                            Text = x.Text,
                            Created = x.Created,
                            Closed = x.Closed,
                            Tags = x.Tags,
                            Colour = x.Colour,
                            Version = x.Version.ToString()
                        }
                )
                .ToListAsync(cancellationToken) ?? new List<TodoItem>();
    }
}
