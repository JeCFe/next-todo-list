namespace Server.DbModels;

public record Todo
{
    public required string Text { get; init; }
    public required DateTime Created { get; init; }
    public required string UserId { get; init; }

    public int Version { get; set; }
    public required User User { get; init; }
    public string? Colour { get; init; }
    public string? Tags { get; init; } // Todo will need to be an array but that will require additional models

    public DateTime? Closed { get; private set; }

    public void Close()
    {
        Closed = DateTime.UtcNow;
        Version++;
    }
}
