using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Server.Routes;

public static class AuthRouter
{

    private static Ok<string> GetAuthTest(HttpRequest request)
    {
        // Access user information from the HttpContext
        var userId = request.HttpContext.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Your logic here...

        return TypedResults.Ok(userId);
    }

    public static RouteGroupBuilder MapAuthEndpoints(this RouteGroupBuilder group)
    {
        group.WithTags("Auth");
        group.MapGet("/", GetAuthTest).RequireAuthorization();
        return group;
    }
}