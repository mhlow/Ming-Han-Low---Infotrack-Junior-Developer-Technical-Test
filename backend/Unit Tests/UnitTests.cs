using Xunit;
using FluentAssertions;
using System.Net.Http.Json;
using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using backend.Models;
using backend.Services.Interfaces;
using backend.Services;

// Example of a fully populated ExternalProperty object for reference
// var exampleExternalProperty = new ExternalProperty(
//     provider: "ProviderX",
//     requestId: "REQ123",
//     receivedAt: DateTimeOffset.UtcNow,
//     addressParts: new AddressParts(
//         "Sample Avenue",
//         "Testville",
//         "NSW",
//         "2000"
//     ),
//     formattedAddress: "10 Sample Avenue, Testville NSW 2000",
//     lotPlan: new LotPlan(
//         "LOT 1",
//         "RP123456"
//     ),
//     title: new VolumeFolio("1234", "567"),
//     extra: "ExtraValue"
// );

namespace PropertyNormalization.Tests
{
    // Unit tests
    public class PropertyServiceTests
    {
        private readonly PropertyService _propertyService;
        public PropertyServiceTests()
        {
            _propertyService = new PropertyService();
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnKnownVolFol_WhenValidVolumeFolioProvided()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderX",
                requestId: "REQ123",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: new AddressParts(
                    "Sample Avenue",
                    "Testville",
                    "NSW",
                    "2000"
                ),
                formattedAddress: "10 Sample Avenue, Testville NSW 2000",
                lotPlan: new LotPlan(
                    "LOT 1",
                    "RP123456"
                ),
                title: new VolumeFolio("100", "200"),
                extra: "ExtraValue"
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.Status.Should().Be("KnownVolFol");
            result.VolumeFolio.Volume.Should().Be("100");
            result.VolumeFolio.Folio.Should().Be("200");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnUnknownVolFol_WhenVolumeFolioMissing()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderY",
                requestId: "REQ456",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: new AddressParts(
                    "Example Street",
                    "Sampletown",
                    "VIC",
                    "3000"
                ),
                formattedAddress: "20 Example Street, Sampletown VIC 3000",
                lotPlan: new LotPlan(
                    "LOT 2",
                    "RP654321"
                ),
                title: null, // Missing VolumeFolio
                extra: "AnotherExtraValue"
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.Status.Should().Be("UnknownVolFol");
            result.VolumeFolio.Volume.Should().Be("Unknown Volume");
            result.VolumeFolio.Folio.Should().Be("Unknown Folio");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnUnknownVolFol_WhenVolumeMissing()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderY",
                requestId: "REQ456",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: new AddressParts(
                    "Example Street",
                    "Sampletown",
                    "VIC",
                    "3000"
                ),
                formattedAddress: "20 Example Street, Sampletown VIC 3000",
                lotPlan: new LotPlan(
                    "LOT 2",
                    "RP654321"
                ),
                title: new VolumeFolio(Volume: null, Folio: "300"), // Missing Volume
                extra: "AnotherExtraValue"
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.Status.Should().Be("UnknownVolFol");
            result.VolumeFolio.Volume.Should().BeNull();
            result.VolumeFolio.Folio.Should().Be("300");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnFormattedAddress_WhenProvidedAndAddressPartsAreMissing()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderZ",
                requestId: "REQ789",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: null, // No address parts
                formattedAddress: "30 Test Road, Examplestown NSW 4000",
                lotPlan: null,
                title: null,
                extra: null
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.FullAddress.Should().Be("30 Test Road, Examplestown NSW 4000");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnFormattedAddress_WhenProvidedAndAddressPartsArePresent()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderZ",
                requestId: "REQ789",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: new AddressParts(
                    "Test Road",
                    "Examplestown",
                    "NSW",
                    "4000"
                ),
                formattedAddress: "30 Test Road, Examplestown NSW 4000",
                lotPlan: null,
                title: null,
                extra: null
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.FullAddress.Should().Be("30 Test Road, Examplestown NSW 4000");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnConcatenatedAddress_WhenProvidedAndFormattedAddressIsMissing()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderZ",
                requestId: "REQ789",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: new AddressParts(
                    "Test Road",
                    "Examplestown",
                    "NSW",
                    "4000"
                ),
                formattedAddress: null, // No formatted address
                lotPlan: null,
                title: null,
                extra: null
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.FullAddress.Should().Be("Test Road, Examplestown, NSW, 4000");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnUnknownAddress_WhenBothFormattedAddressAndAddressPartsAreMissing()
        {
            // Arrange
            var external = new ExternalProperty(
                provider: "ProviderZ",
                requestId: "REQ789",
                receivedAt: DateTimeOffset.UtcNow,
                addressParts: null, // No address parts
                formattedAddress: null, // No formatted address
                lotPlan: null,
                title: null,
                extra: null
            );

            // Act
            var result = _propertyService.NormalizeProperty(external);

            // Assert
            result.FullAddress.Should().Be("Unknown Address");
        }
    }
}