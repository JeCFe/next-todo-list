﻿using MediatR;

namespace Server.Commands;

public class CommandHandler<TDBContext, TCommand> : IRequestHandler<TCommand>
    where TCommand : ICommand<TDBContext>
    where TDBContext : TodoDb
{
    private readonly TDBContext _dbContext;
    private readonly IPublisher _publisher;
    public CommandHandler(TDBContext dBContext, IPublisher publisher)
    {
        _dbContext = dBContext;
        _publisher = publisher;

    }

    public Task Handle(TCommand request, CancellationToken cancellationToken)
    {
        return request.Execute(_dbContext, _publisher, cancellationToken);
    }
}
