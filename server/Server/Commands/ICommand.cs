using MediatR;
using Server.Context;

namespace Server.Commands;

public interface ICommand<TDBContext> : IRequest
    where TDBContext : TodoDb
{
    Task Execute(
        TDBContext context,
        IPublisher publisher,
        IUserContext userContext,
        CancellationToken cancellationToken
    );
}

public interface ICommand : ICommand<TodoDb> { }
