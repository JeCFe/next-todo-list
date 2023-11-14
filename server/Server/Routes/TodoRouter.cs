using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Server.Model;
using Server.Providers;

namespace Server.Routes;

public static class TodoRouter
{

    private static Ok<string> GetTodos(HttpContext context, ITodoProvider todoProvider, CancellationToken cancellationToken)
    {
        var userId = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return TypedResults.Ok(userId);
    }

    private static Ok AddTodo(
        HttpContext context, 
        TodoItem todoItem, 
        ITodoProvider todoProvider,
        TodoContext dbContext,
        CancellationToken cancellationToken)
    {
        var userId = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var a = todoProvider.AddTodo(dbContext, userId!, todoItem, cancellationToken);
        return TypedResults.Ok();
    }

    public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Todo");
        group.MapGet("/items", GetTodos).RequireAuthorization();
        group.MapPost("/add", AddTodo).RequireAuthorization();
        return group;
    }
}