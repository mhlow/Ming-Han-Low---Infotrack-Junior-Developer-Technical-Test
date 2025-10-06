namespace backend.Models;
public record ExternalProperty(
    string? provider,
    string? requestId,
    DateTimeOffset? receivedAt,
    AddressParts? addressParts,
    string? formattedAddress,
    LotPlan? lotPlan,
    VolumeFolio? title,
    string? extra
);