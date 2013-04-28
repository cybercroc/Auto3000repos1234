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
        }
    }
}