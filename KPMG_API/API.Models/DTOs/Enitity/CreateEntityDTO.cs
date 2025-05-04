using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.DTOs.Enitity
{
    public class CreateEntityDTO
    {
        public string Title { get; set; }
        public decimal PercentageWeight { get; set; }
        public int SessionId { get; set; }

    }
}
