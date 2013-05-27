using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

using System.Threading.Tasks;

namespace SignalRChat
{
    [HubName("chatHubs")]
    public class ChatHub : Hub
    {
        #region [Data Memeber]

        static List<UserDetail> ConnectedUsers = new List<UserDetail>();
        static List<MessageDetail> CurrentMessage = new List<MessageDetail>();
        static List<AdminUserCount> AdminUserConnect = new List<AdminUserCount>();

        String constring = ConfigurationManager.ConnectionStrings["Auto3000Entities"].ConnectionString.ToString();
        #endregion
        public void Connect(string userName)
        {
            var id = Context.ConnectionId;
            String UserType = "C";
            String ClientId = "0";

            if (Context.User.Identity.IsAuthenticated)
            {

                if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
                {
                    String UserId = "1";//HttpContext.Current.Session["UserId"].ToString();

                    ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = Context.User.Identity.Name, UserType = "A", ClientId = UserId });


                    // send to caller
                    Clients.Caller.onConnected(id, userName, ConnectedUsers, CurrentMessage, UserId);

                    // send to all except caller client
                    //  Clients.AllExcept(id).onNewUserConnected(id, userName);
                }
            }
            else
            {

                if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
                {

                    ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = userName, UserType = UserType, ClientId = ClientId });


                    // send to caller
                    Clients.Caller.onConnected(id, userName, ConnectedUsers, CurrentMessage, ClientId);

                    // send to all except caller client
                    //  Clients.AllExcept(id).onNewUserConnected(id, userName);
                }
            }

        }

        #region [Pick rendomly admin user]

        public void AssignUser()
        {
            List<AdminUserCount> Adminuser = new List<AdminUserCount>();
            Adminuser.AddRange(AdminUserConnect.Where(x => x.ToUserId.Count() >= 0).ToList());

            var item = ConnectedUsers.Where(x => !Adminuser.Any(y => y.ToUserId == x.ConnectionId) && x.UserType == "A").ToList();
            var rand = new Random();
            if (item.Count() > 0)
            {
                var user = item.ElementAt(rand.Next(item.Count()));
                Clients.Caller.OnUserConnected(user.ConnectionId, user.UserName);
            }
            else
                Clients.Caller.OnUserConnected(0, "Sorry not user unavailable!");


        }
        #endregion

        #region  [To Private chat]

        public void SendPrivateMessage(string toUserId, string message)
        {

            string fromUserId = Context.ConnectionId;

            var toUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == toUserId);
            var fromUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == fromUserId);

            if (toUser != null && fromUser != null)
            {
                // send to 
                Clients.Client(toUserId).sendPrivateMessage(fromUserId, fromUser.UserName, message);

                // send to caller user
                Clients.Caller.sendPrivateMessage(toUserId, fromUser.UserName, message);

                ///Add admin user for count chating
                ///
                if (!AdminUserConnect.Exists(usr => usr.ToUserId != toUserId && usr.FromUserid != fromUserId))
                {
                    AdminUserConnect.Add(new AdminUserCount { ToUserId = toUserId, FromUserid = fromUserId });
                }
            }

        }

        #endregion

        #region [To Disconnect Chat]

        public override Task OnDisconnected()
        {
            var item = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            var adminusercount = AdminUserConnect.FirstOrDefault(usr => usr.ToUserId != Context.ConnectionId | usr.FromUserid != Context.ConnectionId);
            if (item != null)
            {
                ConnectedUsers.Remove(item);

                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.UserName);
                AdminUserConnect.Remove(adminusercount);
            }

            return base.OnDisconnected();
        }

        #endregion


        #region private Messages

        private void AddMessageinCache(string userName, string message)
        {
            CurrentMessage.Add(new MessageDetail { UserName = userName, Message = message });

            if (CurrentMessage.Count > 100)
                CurrentMessage.RemoveAt(0);
        }

        #endregion

        #region [To Show typing]

        public void Keypressed(string touserid)
        {
            var user = ConnectedUsers.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            var toUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == touserid);

            if (user == null)
            {
                throw new Exception("User is not logged in");
            }

            Clients.Client(touserid).userTyping(user.UserName);
        }

        #endregion
    }

    public class MessageDetail
    {

        public string UserName { get; set; }

        public string Message { get; set; }

    }

    public class UserDetail
    {
        public string ConnectionId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string ClientId { get; set; }
    }
    public class AdminOnlineUser
    {
        public string UserId { get; set; }
        public String Name { get; set; }
    }

    public class AdminUserCount
    {
        public string ToUserId { get; set; }
        public string FromUserid { get; set; }
    }

}
