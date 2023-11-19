namespace Server.DbModels;

public record User
{
    public required string Id { get; init; }
    public ICollection<Todo> Todos { get; set; } = new List<Todo>();
}
