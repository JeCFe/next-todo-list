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

    private static async Task<
        Results<Ok, ForbidHttpResult, NotFound, BadRequest<string>>
    > DeleteTodo(
        DeleteTodoItemCommand command,
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
        catch (TodoNotFound)
        {
            return TypedResults.NotFound();
        }
        catch (InvalidVersion error)
        {
            return TypedResults.BadRequest(error.Message);
        }
    }

    public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Todo");
        group.MapGet("/items", GetTodos).RequireAuthorization();
        group.MapPost("/add", AddTodo).RequireAuthorization();
        group.MapPost("/delete", DeleteTodo).RequireAuthorization();
        return group;
    }
}
