using Server.DbModels;
using Server.Model;

namespace Server.Providers;

public class TodoProvider : ITodoProvider
{
    public async Task AddTodo(TodoDb dbContext, string userId, TodoItem todoItem, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FindAsync(new object?[] { userId }, cancellationToken);

        if (user is not null)
        {
            user.Todos.Add(new Todo
            {
                Id = Guid.NewGuid().ToString(),
                Text = todoItem.Text,
                Colour = todoItem.Colour,
                Tags = todoItem.Tags,
                Created = new DateTime(),
                User = user,
                UserId = user.Id
            });
        }
        else
        {
            var newerUser = dbContext.Users.Add(new User()
            {
                Id = userId
            }).Entity;

            newerUser.Todos.Add(new Todo
            {
                Id = Guid.NewGuid().ToString(),
                Text = todoItem.Text,
                Colour = todoItem.Colour,
                Tags = todoItem.Tags,
                Created = new DateTime(),
                User = newerUser,
                UserId = newerUser.Id
            });

        }
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<List<TodoItem>> GetTodos(TodoDb dbContext, string userId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}