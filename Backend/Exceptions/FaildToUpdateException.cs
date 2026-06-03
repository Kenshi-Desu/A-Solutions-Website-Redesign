using System;

namespace A_Solutions_Website_Redesign.Backend.Exceptions;

public class FailedToUpdateException : Exception
{
    public FailedToUpdateException(string message) : base(message)
    {
    }

    public FailedToUpdateException(string message, Exception innerException) : base(message, innerException)
    {
    }
}