namespace Server.Exceptions;

public class InvalidVersion : Exception
{
    public InvalidVersion() { }

    public InvalidVersion(string message)
        : base(message) { }
}
