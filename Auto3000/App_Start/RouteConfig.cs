using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Auto3000
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);

            //routes.MapRoute(
            //    name: "AdminLogin",
            //    url: "admin/login",
            //    defaults: new { controller = "AdminAccount", action = "Login" }
            //    );

            routes.MapRoute("AdminLogin", "admin/login", new { controller = "AdminAccount", action = "Login" });
            routes.MapRoute("AdminAppointment", "admin/appointments", new { controller = "AdminAppointment", action = "Index" });
            routes.MapRoute("AdminAppointmentDelete", "admin/appointmentdel", new { controller = "AdminAppointment", action = "Delete" });
            routes.MapRoute("AdminDashboard", "admin/dashboard", new { controller = "AdminAppointment", action = "Dashboard" });

            #region [Routes For FeedBack Admin]
            routes.MapRoute("AdminFeedback", "admin/feedback", new { controller = "AdminFeedback", action = "Index" });
            routes.MapRoute("AdminFeedbackDelete", "admin/feedbackdel", new { controller = "AdminFeedback", action = "Delete" });
            #endregion

            #region [Routes For Contact Admin]
            routes.MapRoute("AdminContact", "admin/contact", new { controller = "AdminContact", action = "Index" });
            routes.MapRoute("AdminContactDelete", "admin/contactdel", new { controller = "AdminContact", action = "Delete" });
            #endregion

        }
    }
}