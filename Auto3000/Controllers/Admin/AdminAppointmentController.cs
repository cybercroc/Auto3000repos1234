using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Auto3000.Models;

namespace Auto3000.Controllers.Admin
{
    public class AdminAppointmentController : BaseController
    {
        //
        // GET: /AdminAppointment/

        public ActionResult Index(Int32? id)
        {
            if (Request.IsAjaxRequest())
            {
                var result = dbcontext.usp_tblAppointment_sel(id).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return View();
        }

        /*Insert into tblAnnouncement*/
        [HttpPost]
        public ActionResult Index(AdminModel.Announcement model)
        {

            var result = dbcontext.usp_tblAppointment_ins(model.AnnouncementId, model.Title, model.Description, model.IsActive).SingleOrDefault();

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Delete(Int32? id)
        {
            dbcontext.usp_tblAppointment_del(id);
            return Json("1", JsonRequestBehavior.AllowGet);
        }

    }
}
