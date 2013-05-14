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
        #region Validation Rules For Announcmenttz
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

            //public IEnumerable<usp_tblAppointment_sel_Result> AppointmentList { get; set; }
        }
        #endregion

        #region [Properties for Feedback]

        public class Feedback
        {

            public String FeedBack { get; set; }

            public Int32 Ratings { get; set; }

            public Int32 FeedBackId { get; set; }

            public Boolean Show { get; set; }

            public string UserId { get; set; }


            public String SentDate { get; set; }

            public String Answers { get; set; }

            public String Question { get; set; }



            public IEnumerable<usp_Feedbacks_sel_Result> FeedbackList { get; set; }
        }


        #endregion


        #region [Properties for Contacts]

        public class Contact
        {


            public String ÚserName { get; set; }

            public String FirstName { get; set; }

            public String LastName { get; set; }

            public Int32 ContactId { get; set; }

            public Boolean IsApproved { get; set; }

            public String Phone { get; set; }

            public String ZipCode { get; set; }

            public String Email { get; set; }

            public String SentDate { get; set; }

            public String SubjectName { get; set; }

            public IEnumerable<usp_Contacts_sel_Result> ContactList { get; set; }

        }

        #endregion

    }
}