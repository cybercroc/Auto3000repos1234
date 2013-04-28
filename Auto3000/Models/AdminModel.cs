using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace Auto3000.Models
{
    public partial class AdminModel
    {
        #region Validation Rules For Country
        public class Announcement
        {
            [DisplayName("Title")]
            [Required(ErrorMessage = "Select")]
            public String Title { get; set; }

            [DisplayName("Description")]
            [Required(ErrorMessage = "Select")]
            public String Description { get; set; }

            public Int32 AnnouncementId { get; set; }

            public Boolean IsActive { get; set; }

            public IEnumerable<usp_tblAppointment_sel_Result> AppointmentList { get; set; }
        }
        #endregion

    }
}