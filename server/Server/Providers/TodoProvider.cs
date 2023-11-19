using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.DbModels;
using Server.Model;

namespace Server.Providers;

public class TodoProvider : ITodoProvider
{
    public async Task<List<TodoItem>> GetTodos(
        TodoDb dbContext,
        IUserContext userContext,
        CancellationToken cancellationToken
    )
    {
        //FIXME: Create custom error to return + handle in router
        //TODO: Return null which would mean 404
        var userId = userContext.UserId ?? throw new Exception("User Id is null");
        return await dbContext
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
                        Colour = x.Colour
                    }
            )
            .ToListAsync(cancellationToken);
    }
}
