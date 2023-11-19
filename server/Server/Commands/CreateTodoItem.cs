using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.DbModels;

namespace Server.Commands;

public class CreateTodoItemCommand : ICommand
{
    public required string Text { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; }

    public async Task Execute(
        TodoDb context,
        IPublisher publisher,
        IUserContext userContext,
        CancellationToken cancellationToken
    )
    {
        //FIXME: Create custom error to return + handle in router
        var userId = userContext.UserId ?? throw new Exception("User Id is null");
        var existingUser = await context
            .Users
            .FindAsync(new object?[] { userId }, cancellationToken);

        if (existingUser is not null)
        {
            existingUser
                .Todos
                .Add(
                    new()
                    {
                        Text = Text,
                        Colour = Colour,
                        Tags = Tags,
                        Created = new DateTime(),
                        User = existingUser,
                        UserId = existingUser.Id
                    }
                );
        }
        else
        {
            var newUser = context.Users.Add(new User() { Id = userId, }).Entity;

            newUser
                .Todos
                .Add(
                    new Todo
                    {
                        Text = Text,
                        Colour = Colour,
                        Tags = Tags,
                        Created = new DateTime(),
                        User = newUser,
                        UserId = newUser.Id
                    }
                );
        }
        await context.SaveChangesAsync(cancellationToken);
    }
}
