using Moq;
using Server.Context;
using Server.DbModels;
using Server.Providers;
using ServerTests.Fixtures;

namespace ServerTests;

public class TodoProviderTests : IClassFixture<DbFixture>
{
    private readonly DbFixture _fixture;

    public TodoProviderTests(DbFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task Successfully_return_list_of_todo_items()
    {
        using var context = _fixture.CreateContext();
        var userId = Guid.NewGuid().ToString();
        var userId2 = Guid.NewGuid().ToString();

        var userContextMock = new Mock<IUserContext>();
        userContextMock.Setup(x => x.UserId).Returns(userId);

        context.Users.AddRange(new User() { Id = userId }, new User() { Id = userId2 });

        var user1 = context.Users.Find(userId);
        var user2 = context.Users.Find(userId2);

        Assert.NotNull(user1);
        Assert.NotNull(user2);

        user1.Todos = new List<Todo>()
        {
            new()
            {
                Text = "This is user 1 todo 1",
                Created = DateTime.UtcNow,
                User = user1,
                UserId = user1.Id,
                Version = 1
            },
            new()
            {
                Text = "This is user 1 todo 2",
                Created = DateTime.UtcNow,
                User = user1,
                UserId = user1.Id,
                Version = 1
            },
        };

        user2.Todos = new List<Todo>()
        {
            new()
            {
                Text = "This is user 2 todo 1",
                Created = DateTime.UtcNow,
                User = user2,
                UserId = user2.Id,
                Version = 1
            },
            new()
            {
                Text = "This is user 2 todo 2",
                Created = DateTime.UtcNow,
                User = user2,
                UserId = user2.Id,
                Version = 1
            },
        };

        context.SaveChanges();

        var todoProvider = new TodoProvider(context, userContextMock.Object);

        var todoItems = await todoProvider.GetTodos(CancellationToken.None);

        Assert.Equal(2, todoItems.Count);
        Assert.NotNull(todoItems.SingleOrDefault(x => x.Text == "This is user 1 todo 1"));
        Assert.NotNull(todoItems.SingleOrDefault(x => x.Text == "This is user 1 todo 2"));
    }
}
