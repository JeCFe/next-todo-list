using System.Drawing;
using MediatR;
using Microsoft.Identity.Client;
using Server;
using Server.Commands;
using ServerTests.Fixtures;

namespace ServerTests;

public class CreateTodoItemCommandTests : IClassFixture<DbFixture>
{
    private readonly DbFixture _fixture;
    public CreateTodoItemCommandTests(DbFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task Add_new_user_and_todo_item()
    {
        using var context = _fixture.CreateContext();
        var user = Guid.NewGuid().ToString();
        var text = "This is a test";
        var cmd = new CreateTodoItemCommand
        {
            Text = text,
            UserId = user
        };
        await _fixture.Execute(context, cmd);

        var newTodo = context.Todos.SingleOrDefault(x => x.Id == text);
        var addedUser = context.Users.Find(user);

        Assert.NotNull(addedUser);
        Assert.Equal(user, addedUser.Id);

        Assert.NotNull(newTodo);
        Assert.Equal(text, newTodo.Id);
    }

    [Fact]
    public async Task Add_todo_to_existing_user()
    {
        using var context = _fixture.CreateContext();
        var userId = Guid.NewGuid().ToString();

        context.Users.Add(new()
        {
            Id = userId
        });

        var text = "This is a test";
        var cmd = new CreateTodoItemCommand
        {
            Text = text,
            UserId = userId
        };

        await _fixture.Execute(context, cmd);

        var newTodo = context.Todos.FirstOrDefault(x => x.Id == text);
        Assert.NotNull(newTodo);
        Assert.Equal(text, newTodo.Id);

    }
}
