using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Server.Commands;
using Server.Exceptions;
using Server.Model;
using Server.Providers;

namespace Server.Routes;

public static class TodoRouter
{
    private static async Task<Results<Ok<List<TodoItem>>, ForbidHttpResult>> GetTodos(
        ITodoProvider todoProvider,
        CancellationToken cancellationToken
    )
    {
        try
        {
            return TypedResults.Ok(await todoProvider.GetTodos(cancellationToken));
        }
        catch (InvalidUserException)
        {
            return TypedResults.Forbid();
        }
    }

    private static async Task<Results<Ok, ForbidHttpResult>> AddTodo(
        HttpContext context, // todo remove this in favour of process ident
        CreateTodoItemCommand command,
        IMediator mediator,
        CancellationToken cancellationToken
    )
    {
        try
        {
            await mediator.Send(command, cancellationToken);
            return TypedResults.Ok();
        }
        catch (InvalidUserException)
        {
            return TypedResults.Forbid();
        }
    }

    public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Todo");
        group.MapGet("/items", GetTodos).RequireAuthorization();
        group.MapPost("/add", AddTodo).RequireAuthorization();
        return group;
    }
}
