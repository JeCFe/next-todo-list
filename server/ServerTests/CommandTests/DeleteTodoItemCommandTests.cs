using Bogus;
using Moq;
using Server.Commands;
using Server.Context;
using Server.Exceptions;
using ServerTests.Fixtures;

namespace ServerTests;

public class DeleteTodoItemCommandTests : IClassFixture<DbFixture>
{
    private readonly DbFixture _fixture;

    public DeleteTodoItemCommandTests(DbFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task Successfully_delete_todo_item()
    {
        using var context = _fixture.CreateContext();
        var userId = Guid.NewGuid().ToString();
        var text = new Faker().Random.Words();
        var cmd = new CreateTodoItemCommand { Text = text };

        var userContextMock = new Mock<IUserContext>();
        userContextMock.Setup(x => x.UserId).Returns(userId);
        await _fixture.Execute(context, cmd, userContextMock.Object);

        var newTodo = context.Todos.SingleOrDefault(x => x.Text == text);
        var addedUser = context.Users.Find(userId);

        Assert.NotNull(addedUser);
        Assert.Equal(userId, addedUser.Id);

        Assert.NotNull(newTodo);
        Assert.Equal(text, newTodo.Text);

        var deleteCommand = new DeleteTodoItemCommand
        {
            Text = newTodo.Text,
            Created = newTodo.Created,
            Version = newTodo.Version.ToString()
        };

        await _fixture.Execute(context, deleteCommand, userContextMock.Object);
        var closedTodo = context.Todos.SingleOrDefault(x => x.Text == text);
        Assert.NotNull(closedTodo);
        Assert.Equal(closedTodo.Version, newTodo.Version++);
        Assert.NotNull(closedTodo.Closed);
    }

    [Fact]
    public async Task Throw_error_when_trying_to_delete_old_version()
    {
        using var context = _fixture.CreateContext();
        var userId = Guid.NewGuid().ToString();
        var text = new Faker().Random.Words();
        var cmd = new CreateTodoItemCommand { Text = text };

        var userContextMock = new Mock<IUserContext>();
        userContextMock.Setup(x => x.UserId).Returns(userId);
        await _fixture.Execute(context, cmd, userContextMock.Object);

        var newTodo = context.Todos.SingleOrDefault(x => x.Text == text);
        var addedUser = context.Users.Find(userId);

        Assert.NotNull(addedUser);
        Assert.Equal(userId, addedUser.Id);

        Assert.NotNull(newTodo);
        Assert.Equal(text, newTodo.Text);

        var deleteCommand = new DeleteTodoItemCommand
        {
            Text = newTodo.Text,
            Created = newTodo.Created,
            Version = (newTodo.Version + 10).ToString()
        };

        _ = Assert.ThrowsAsync<InvalidVersion>(
            async () => await _fixture.Execute(context, deleteCommand, userContextMock.Object)
        );
    }
}
