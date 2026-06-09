using Postgrest.Attributes;
using Postgrest.Models;
using System.Diagnostics.CodeAnalysis;

namespace A_Solutions_Website_Redesign.Backend.Model.Entities;

[Table("ocrc_event_details")]
public class OCRCEventDetails : BaseModel
{
    [SetsRequiredMembers]
    public OCRCEventDetails()
    {
        EventTime = string.Empty;
        VenueName = string.Empty;
        Eligibility = string.Empty;
        RulesPdfUrl = string.Empty;
    }

    [PrimaryKey("id", false)]
    public int Id { get; set; }

    [Column("event_date")]
    public DateOnly EventDate { get; set; }

    [Column("event_time")]
    public string EventTime { get; set; }

    [Column("venue_name")]
    public string VenueName { get; set; }

    [Column("eligibility")]
    public string Eligibility { get; set; }

    [Column("rules_pdf_url")]
    public string RulesPdfUrl { get; set; }
}