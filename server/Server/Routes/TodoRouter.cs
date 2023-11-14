using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Server.Routes;

public static class TodoRouter
{

    private static Ok<string> GetTodos(HttpRequest request)
    {
        var userId = request.HttpContext.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return TypedResults.Ok(userId);
    }

    public static RouteGroupBuilder MapTodoEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Todo");
        group.MapGet("/items", GetTodos).RequireAuthorization();
        return group;
    }
}