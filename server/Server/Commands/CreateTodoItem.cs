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

        var existingUser = await context.Users.FindAsync(new object?[] { UserId }, cancellationToken);

        if (existingUser is not null)
        {
            existingUser.Todos.Add(new()
            {
                Id = Guid.NewGuid().ToString(),
                Text = Text,
                Colour = Colour,
                Tags = Tags,
                Created = new DateTime(),
                User = existingUser,
                UserId = existingUser.Id
            });
        }
        else
        {
            var newUser = context.Users.Add(new User()
            {
                Id = UserId,
            }).Entity;

            newUser.Todos.Add(new Todo
            {
                Id = Guid.NewGuid().ToString(),
                Text = Text,
                Colour = Colour,
                Tags = Tags,
                Created = new DateTime(),
                User = newUser,
                UserId = newUser.Id
            });

        }
        await context.SaveChangesAsync(cancellationToken);
    }
}
