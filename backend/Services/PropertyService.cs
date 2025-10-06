using backend.Models;
using backend.Services.Interfaces;
using Humanizer;

namespace backend.Services
{
    public class PropertyService : IPropertyService
    {
        public InternalProperty NormalizeProperty(ExternalProperty externalProperty)
        {
            return new InternalProperty(
                FullAddress: externalProperty.formattedAddress ?? "Unknown Address",
                LotPlan: externalProperty.lotPlan ?? new LotPlan(Lot: "Unknown Lot", Plan: "Unknown Plan"),
                VolumeFolio: externalProperty.title ?? new VolumeFolio(Volume: "Unknown Volume", Folio: "Unknown Folio"),
                Status: "Normalized"
            );
        }
    }
}