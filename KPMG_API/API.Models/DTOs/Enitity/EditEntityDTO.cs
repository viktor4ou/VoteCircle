using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.DTOs.Enitity
{
    public class EditEntityDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public decimal PercentageWeight { get; set; }
    }
}
