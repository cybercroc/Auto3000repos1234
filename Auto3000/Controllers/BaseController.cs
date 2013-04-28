using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Auto3000.Models;

namespace Auto3000.Controllers
{
    /*Base Controller for all Default Functions*/
    public class BaseController : Controller
    {
        public Entities dbcontext = new Entities();
    }
}
