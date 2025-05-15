import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    // Assign random username on load
    useEffect(() => {
        setUser("User" + Math.floor(Math.random() * 1000));
    }, []);

    // Build SignalR connection
    useEffect(() => {
        const token = localStorage.getItem("token"); // Get JWT token

        const hubConnectionBuilder = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5112/chatHub", {
                accessTokenFactory: () => token,
                // You can remove transport option to let SignalR pick best transport:
                // transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information);

        const newConnection = hubConnectionBuilder.build();
        setConnection(newConnection);
    }, []);

    // Start connection and set handlers
    useEffect(() => {
        if (!connection) return;

        // Receive messages from server
        connection.on("ReceiveMessage", (user, message) => {
            setMessages((prev) => [...prev, `${user}: ${message}`]);
        });

        // Connection lifecycle events
        connection.onreconnecting((error) => {
            console.warn("SignalR reconnecting", error);
            setIsConnected(false);
        });

        connection.onreconnected(() => {
            console.log("SignalR reconnected");
            setIsConnected(true);
        });

        connection.onclose((error) => {
            console.error("SignalR connection closed", error);
            setIsConnected(false);
        });

        // Start the connection
        connection
            .start()
            .then(() => {
                console.log("SignalR connected");
                setIsConnected(true);
            })
            .catch((error) => {
                console.error("SignalR connection error", error);
            });

        // Cleanup on unmount
        return () => {
            connection.stop();
        };
    }, [connection]);

    // Send message to server
    const sendMessage = async () => {
        if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
            console.warn("Connection not ready");
            return;
        }
        const trimmed = message.trim();
        if (trimmed && user) {
            try {
                await connection.invoke("SendMessage", user, trimmed);
                setMessage("");
            } catch (error) {
                console.error("Send failed:", error);
            }
        }
    };

    return (
        <div className="p-4 border rounded shadow max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-2">Public Chat</h2>
            <p className="mb-2 text-gray-700">
                You are: <strong>{user}</strong>
            </p>
            <div className="mb-4">
                <textarea
                    className="border p-2 w-full mb-2 resize-none"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isConnected ? "Enter message" : "Connecting..."}
                    disabled={!isConnected}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={!isConnected || !message.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Send
                </button>
            </div>
            <ul className="space-y-1 max-h-64 overflow-auto border p-2 rounded bg-gray-50">
                {messages.map((msg, i) => (
                    <li key={i} className="bg-white p-2 rounded shadow-sm">
                        {msg}
                    </li>
                ))}
            </ul>
            {!isConnected && (
                <p className="mt-2 text-red-600 font-semibold">Connecting to chat...</p>
            )}
        </div>
    );
};

export default Chat;
