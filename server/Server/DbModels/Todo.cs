namespace Server.DbModels;

public record Todo
{
    public string? Id { get; init; }
    public required string Text { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; }
    public required DateTime Created { get; init; }
    public DateTime? Closed { get; init; }
    public required string UserId { get; set; }
    public required User User { get; set; }
}
