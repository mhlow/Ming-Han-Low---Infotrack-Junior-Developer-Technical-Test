using backend.Models;
using backend.Services.Interfaces;
using Humanizer;

namespace backend.Services
{
    public class PropertyService : IPropertyService
    {
        public InternalProperty NormalizeProperty(ExternalProperty externalProperty)
        {
            string fullAddress = getAddress(externalProperty);

            return new InternalProperty(
                FullAddress: fullAddress,
                LotPlan: externalProperty.lotPlan, // Not according to spec; can be nullable
                VolumeFolio: externalProperty.title ?? new VolumeFolio(Volume: "Unknown Volume", Folio: "Unknown Folio"),
                Status: externalProperty.title != null ? "KnownVolFol" : "UnknownVolFol",
                SourceTrace: new SourceTrace(
                    provider: externalProperty.provider,
                    requestId: externalProperty.requestId,
                    receivedAt: externalProperty.receivedAt
                )
            );
        }

        private string getAddress(ExternalProperty externalProperty)
        {
            if (!string.IsNullOrEmpty(externalProperty.formattedAddress))
            {
                return externalProperty.formattedAddress;
            }
            else if (externalProperty.addressParts != null)
            {
                // Could be refactored for extensibility
                var parts = new List<string?>
                {
                    externalProperty.addressParts.Street,
                    externalProperty.addressParts.Suburb,
                    externalProperty.addressParts.State,
                    externalProperty.addressParts.Postcode
                };

                return string.Join(", ", parts.Where(part => !string.IsNullOrEmpty(part)));
            }
            else
            {
                return "Unknown Address";
            }
        }
    }
}