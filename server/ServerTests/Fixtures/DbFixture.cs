using MediatR;
using Microsoft.EntityFrameworkCore;
using Server;
using Moq;
using Microsoft.Data.Sqlite;
using Server.Commands;
using Server.Context;

namespace ServerTests.Fixtures;

public class DbFixture : IDisposable
{

    protected readonly SqliteConnection _connection;
    protected readonly DbContextOptions<TodoDb> _contextOptions;
    private readonly IPublisher _publisher = new Mock<IMediator>().Object;

    public DbFixture()
    {
        _connection = new SqliteConnection("Filename=:memory:");
        _connection.Open();

        _contextOptions = new DbContextOptionsBuilder<TodoDb>()
            .UseSqlite(_connection)
            .Options;
        using var context = new TodoDb(_contextOptions);
        context.Database.EnsureCreated();
    }

    public TodoDb CreateContext() => new TodoDb(_contextOptions);

    public Task Execute(TodoDb dbContext, ICommand command, IUserContext userContext)
    {
        return command.Execute(dbContext, _publisher, userContext, CancellationToken.None);
    }

    public void Dispose()
    {
        _connection.Dispose();
        GC.SuppressFinalize(this);
    }
}

