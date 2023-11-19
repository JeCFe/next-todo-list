using MediatR;
using Server.Context;

namespace Server.Commands;

public class CommandHandler<TDBContext, TCommand> : IRequestHandler<TCommand>
    where TCommand : ICommand<TDBContext>
    where TDBContext : TodoDb
{
    private readonly TDBContext _dbContext;
    private readonly IPublisher _publisher;
    private readonly IUserContext _userContext;
    public CommandHandler(TDBContext dBContext, IPublisher publisher, IUserContext userContext)
    {
        _dbContext = dBContext;
        _publisher = publisher;
        _userContext = userContext;

    }

    public Task Handle(TCommand request, CancellationToken cancellationToken)
    {
        return request.Execute(_dbContext, _publisher, _userContext, cancellationToken);
    }
}
