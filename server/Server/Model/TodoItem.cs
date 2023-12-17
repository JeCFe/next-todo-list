namespace Server.Model;

public record TodoItem
{
    public required string Text { get; init; }
    public required string Version { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; }
    public required DateTime Created { get; init; }
    public DateTime? Closed { get; init; }
}
