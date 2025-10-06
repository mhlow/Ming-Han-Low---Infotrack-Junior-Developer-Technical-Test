using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpPost("normalize")]
        public ActionResult<InternalProperty> NormalizeProperty([FromBody] ExternalProperty externalProperty)
        {
            var internalProperty = _propertyService.NormalizeProperty(externalProperty);
            return Ok(internalProperty);
        }
    }
}


