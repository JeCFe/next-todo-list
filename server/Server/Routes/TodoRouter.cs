using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Server.Commands;
using Server.Providers;

namespace Server.Routes;

public static class TodoRouter
{

    private static Ok<string> GetTodos(HttpContext context, ITodoProvider todoProvider, CancellationToken cancellationToken)
    {
        var userId = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return TypedResults.Ok(userId);
    }

    private static async Task<Ok> AddTodo(
        HttpContext context, // todo remove this in favour of process ident
        CreateTodoItemCommand command,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        try
        {
            await mediator.Send(command, cancellationToken);
            return TypedResults.Ok();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        return TypedResults.Ok();
    }

    public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Todo");
        group.MapGet("/items", GetTodos);
        group.MapPost("/add", AddTodo);
        return group;
    }
}