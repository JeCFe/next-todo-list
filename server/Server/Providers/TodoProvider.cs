using Server.DbModels;
using Server.Model;

namespace Server.Providers;

public class TodoProvider : ITodoProvider
{
    public async Task AddTodo(TodoContext dbContext ,string userId, TodoItem todoItem, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FindAsync(new object?[] { userId }, cancellationToken) ?? dbContext.Users
            .AddAsync(new User()
            {
                Id = userId,
                Todos = new List<Todo>()
            }, cancellationToken).Result.Entity;

        user.Todos.Add(new Todo
        {
            Id = Guid.NewGuid().ToString(),
            Text = todoItem.Text,
            Colour = todoItem.Colour,
            Tags = todoItem.Tags,
            Created = new DateTime(),
        });
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<List<TodoItem>> GetTodos(TodoContext dbContext, string userId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}