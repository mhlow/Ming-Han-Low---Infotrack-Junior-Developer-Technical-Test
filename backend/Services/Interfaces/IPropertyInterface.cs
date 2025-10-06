using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IPropertyService
    {
        public InternalProperty NormalizeProperty(ExternalProperty externalProperty);
    }
}