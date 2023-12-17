using MediatR;
using Server.Context;
using Server.DbModels;
using Server.Exceptions;

namespace Server.Commands;

public class DeleteTodoItemCommand : ICommand
{
    public required string Text { get; init; }
    public required DateTime Created { get; init; }
    public required string Version { get; init; }

    public async Task Execute(
        TodoDb context,
        IPublisher publisher,
        IUserContext userContext,
        CancellationToken cancellationToken
    )
    {
        var userId = userContext.UserId ?? throw new InvalidUserException();

        var todo =
            await context
                .Todos
                .FindAsync(new object?[] { Text, Created, userId }, cancellationToken)
            ?? throw new TodoNotFound();

        if (todo.Version != int.Parse(Version))
        {
            throw new InvalidVersion(
                $"Todo version {Version} does not match current version {todo.Version}"
            );
        }

        todo.Close();
        await context.SaveChangesAsync(cancellationToken);
    }
}
