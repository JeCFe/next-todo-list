using MediatR;

namespace Server.Commands;

public interface ICommand<TDBContext> : IRequest
    where TDBContext : TodoDb
{
    Task Execute(TDBContext context, IPublisher publisher, CancellationToken cancellationToken);
}

public interface ICommand : ICommand<TodoDb> { }