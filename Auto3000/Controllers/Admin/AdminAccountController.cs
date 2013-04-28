using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using System.Data.EntityModel;
using Auto3000.Models;

namespace Auto3000.Controllers
{
    // [Authorize]
    //  [InitializeSimpleMembership]
    public class AdminAccountController : BaseController
    {
        //
        // GET: /Account/Login

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }


        [AllowAnonymous]
        public ActionResult ChangePassword()
        {
            return View();
        }

        //
        // POST: /Account/Login


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var result = dbcontext.usp_tblAdminUser_sel(model.UserName, model.Password).SingleOrDefault().ToString();

                if (result != "0")
                {
                    //    return RedirectToAction("Dashboard", "AdminAccount");
                    //  return RedirectToLocal(returnUrl);
                }
            }
            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", "The user name or password provided is incorrect.");
            return View(model);
        }

        //
        // POST: /Account/LogOff

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            //  WebSecurity.Logout();

            return RedirectToAction("Index", "Home");
        }



        [HttpGet]
        public ActionResult Dashboard()
        {
            return View();
        }


        [HttpPost]
        #region Helpers
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        #endregion
    }
}
