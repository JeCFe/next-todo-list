using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.DbModels;

namespace Server.Commands;

public class CreateTodoItemCommand : ICommand
{
    public required string Text { get; init; }
    public required string UserId { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; }

    public async Task Execute(TodoDb context, IPublisher publisher, CancellationToken cancellationToken)
    {
        // todo change this to actually pull from Process identity

        var user = await context.Users.FindAsync(new object?[] { UserId }, cancellationToken);

        if (user is not null)
        {
            var todoItems = user.Todos;

            todoItems.Add(new()
            {
                Id = Guid.NewGuid().ToString(),
                Text = Text,
                Colour = Colour,
                Tags = Tags,
                Created = new DateTime(),
                User = user,
                UserId = user.Id
            });

            user.Todos = todoItems;
        }
        else
        {
            var newerUser = context.Users.Add(new User()
            {
                Id = UserId,
            }).Entity;

            newerUser.Todos.Add(new Todo
            {
                Id = Guid.NewGuid().ToString(),
                Text = Text,
                Colour = Colour,
                Tags = Tags,
                Created = new DateTime(),
                User = newerUser,
                UserId = newerUser.Id
            });

        }
        await context.SaveChangesAsync(cancellationToken);
    }
}
