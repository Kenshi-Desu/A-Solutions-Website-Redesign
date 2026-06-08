using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("contact_settings")]
public class ContactSettings : BaseModel
{
    [SetsRequiredMembers]
    public ContactSettings()
    {
        ContactPhone = string.Empty;
        ContactEmail = string.Empty;
        PhysicalAddress = string.Empty;
        BusinessHours = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("contact_phone")]
    public string ContactPhone { get; set; }

    [Column("contact_email")]
    public string ContactEmail { get; set; }

    [Column("physical_address")]
    public string PhysicalAddress { get; set; }

    [Column("business_hours")]
    public string BusinessHours { get; set; }
}