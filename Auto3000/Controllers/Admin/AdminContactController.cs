using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Auto3000.Controllers.Admin
{
    public class AdminContactController : BaseController
    {
        //
        // GET: /AdminContact/

        #region [Get Feedback from Contact table]

        public ActionResult Index(Int32? Id)
        {
            if (Request.IsAjaxRequest())
            {
                var result = dbcontext.usp_Contacts_sel(Id).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            return View();
        }

        #endregion

        #region [Update records into Contact table]
        [HttpPost]
        public ActionResult Index(Int32 ContactId, bool IsApproved = false)
        {
            var result = dbcontext.usp_Contacts_upd(ContactId, IsApproved);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region [Delete records from Contact table]
        [HttpPost]
        public ActionResult Delete(Int32 ContactId)
        {
            var result = dbcontext.usp_Feedbacks_Del(ContactId);
            return Json("1", JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
