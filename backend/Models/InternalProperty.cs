namespace backend.Models;

public record InternalProperty(
    string FullAddress,
    LotPlan? LotPlan,
    VolumeFolio VolumeFolio,
    string Status,
    SourceTrace SourceTrace
);
