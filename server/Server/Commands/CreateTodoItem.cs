﻿using MediatR;
using Server.Context;
using Server.DbModels;
using Server.Exceptions;

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
        var userId = userContext.UserId ?? throw new InvalidUserException();
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
                        Colour = Colour ?? "white",
                        Tags = Tags,
                        Created = DateTime.UtcNow,
                        User = existingUser,
                        UserId = existingUser.Id,
                        Version = 1,
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
                        Colour = Colour ?? "white",
                        Tags = Tags,
                        Created = DateTime.UtcNow,
                        User = newUser,
                        UserId = newUser.Id,
                        Version = 1
                    }
                );
        }
        await context.SaveChangesAsync(cancellationToken);
    }
}
