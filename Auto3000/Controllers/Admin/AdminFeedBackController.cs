using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Auto3000.Controllers.Admin
{
    public class AdminFeedBackController : BaseController
    {
        //
        // GET: /AdminFeedBack/

        #region [Get records from Feedback table]

        public ActionResult Index(Int32? id)
        {
            if (Request.IsAjaxRequest())
            {
                var result = dbcontext.usp_Feedbacks_sel(id).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return View();
        }

        #endregion
        #region [Update records into Feedback table]

        [HttpPost]
        public ActionResult Index(String FeedbackId, bool IsShow = false)
        {
            var result = dbcontext.usp_Feedbacks_upd(FeedbackId, IsShow).ToString();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region [Delete records from Feedback table]


        public ActionResult Delete(Int32? FeedbackId)
        {
            var result = dbcontext.usp_Feedbacks_Del(FeedbackId).ToString();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
