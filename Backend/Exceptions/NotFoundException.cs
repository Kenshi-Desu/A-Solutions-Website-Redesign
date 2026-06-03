using System;

namespace A_Solutions_Website_Redesign.Backend.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }
}