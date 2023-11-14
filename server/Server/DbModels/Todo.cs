namespace Server.DbModels;


public record Todo
{
    public required string Id { get; init; } = Guid.NewGuid().ToString();
    public required string Text { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; }
    public required DateTime Created { get; init; }
    public DateTime? Closed { get; init; }
}