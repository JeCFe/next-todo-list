namespace Server.DbModels;


public record User
{
    public required string Id { get; init; }
    public required List<Todo> Todos { get; init; } = new();

}