namespace backend.Models;

public record SourceTrace(
    string? provider,
    string? requestId,
    DateTimeOffset? receivedAt
);