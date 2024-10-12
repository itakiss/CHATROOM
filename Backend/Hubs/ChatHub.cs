

using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    private readonly IDictionary<string, UserConnection> _userConnections;

    public ChatHub(IDictionary<string, UserConnection> userConnections)
    {
        _userConnections = userConnections;
    }

    public async Task JoinRoom(string userName)
    {
        var now = DateTime.Now;

        _userConnections[Context.ConnectionId] = new UserConnection
        {
            Name = userName,
            JoinedAt = now
        };

        await Clients.All.SendAsync("ReceiveMessage", new
        {
            from = "System Message",
            text = $"User \"{userName}\" has joined the group.",
            sentAt = now.ToString("g"), // Using standard DateTime format
            isIncoming = true
        });

        await SendConnectedUsers();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            _userConnections.Remove(Context.ConnectionId);

            Clients.All.SendAsync("ReceiveMessage", new
            {
                from = "System Message",  // Translation
                text = $"User \"{userConnection.Name}\" has left the group.",
                sentAt = DateTime.Now.ToString("g"),
                isIncoming = true
            });

            SendConnectedUsers();
        }
        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string message)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            var sentAt = DateTime.Now.ToString("g");

            await Clients.Caller.SendAsync("ReceiveMessage", new
            {
                from = userConnection.Name,
                text = message,
                sentAt,
                isIncoming = false
            });
            await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", new
            {
                from = userConnection.Name,
                text = message,
                sentAt,
                isIncoming = true
            });
        }
    }

    public Task SendConnectedUsers()
    {
        return Clients.All.SendAsync("ReceiveConnectedUsers", _userConnections
            .Select(u => new
            {
                name = u.Value.Name,
                joinedAt = u.Value.JoinedAt.ToString("g")
            }).OrderByDescending(u => u.joinedAt));
    }
}
