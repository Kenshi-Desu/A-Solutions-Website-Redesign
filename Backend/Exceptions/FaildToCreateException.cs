using System;

namespace A_Solutions_Website_Redesign.Backend.Exceptions;

public class FailedToCreateException : Exception
{
    public FailedToCreateException(string message) : base(message)
    {
    }

    public FailedToCreateException(string message, Exception innerException) : base(message, innerException)
    {
    }
}