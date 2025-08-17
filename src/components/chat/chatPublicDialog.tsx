"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePieSocket } from "@/hooks/usePieSocket";
import { useToken } from "@/hooks/useToken";
import { useUsers } from "@/lib/store/useUser";
import { MessageCircle, Send, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPublicDialog() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [hasConnected, setHasConnected] = useState<boolean>(false); // Track connection state
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const { fetchUserLoggedProfile, user, users, loading, error } = useUsers();
  const { token, isAuthenticated, isTokenValid } = useToken();

  const accessToken = token?.access_token;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserLoggedProfile(accessToken as string);
      } catch (error) {
        console.error("Component: Error fetching user profile:", error);
      }
    };

    if (accessToken && !user) {
      fetchData();
    }
  }, [fetchUserLoggedProfile, accessToken, user]);

  // Permanent settings - gunakan nama user yang sebenarnya jika ada
  const CHANNEL_NAME = "acevision";
  const USERNAME = user?.name || user?.email || "anonymous";

  const {
    messages,
    connectionStatus,
    onlineUsers,
    connect,
    sendMessage,
    disconnect,
    clearMessages,
    isConnected,
    isConnecting,
    hasError,
    errorMessage,
    messageCount,
  } = usePieSocket(CHANNEL_NAME);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-connect when dialog opens (tunggu user data ter-load)
  useEffect(() => {
    if (
      isDialogOpen && 
      !isConnected && 
      !isConnecting && 
      !loading && 
      !hasConnected &&
      USERNAME !== "anonymous"
    ) {
      connect(USERNAME);
      setHasConnected(true);
    }
  }, [isDialogOpen, isConnected, isConnecting, loading, hasConnected, connect, USERNAME]);

  // Reset connection state when dialog closes
  useEffect(() => {
    if (!isAuthenticated && !isTokenValid) {
      if (isConnected) {
        disconnect();
        console.log('disconnect')
      }
      setHasConnected(false);
    }
  }, [isAuthenticated, isTokenValid, isConnected, disconnect]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && isConnected) {
      const success = sendMessage(inputMessage);
      if (success) {
        setInputMessage("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "sent":
        return "bg-primary text-white ml-auto max-w-[80%]";
      case "received":
        return "bg-gray-100 text-gray-800 mr-auto max-w-[80%]";
      case "system":
        return "bg-yellow-50 text-yellow-800 text-center text-sm mx-auto max-w-[90%] border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleClearMessages = () => {
    clearMessages();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <MessageCircle size={16} />
          Open Discussion
          {loading && <span className="text-xs">(Loading...)</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle size={20} />
                Public Chat - #{CHANNEL_NAME}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected
                        ? "bg-green-500"
                        : isConnecting || loading
                        ? "bg-yellow-500"
                        : hasError
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  {loading
                    ? "Loading profile..."
                    : isConnected
                    ? "Connected"
                    : isConnecting
                    ? "Connecting..."
                    : hasError
                    ? "Error"
                    : "Disconnected"}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {onlineUsers.length} online
                </span>
              </DialogDescription>
            </div>
          </div>

          {/* Debug info - hapus di production */}
          {user && (
            <div className="text-xs bg-primary p-2 rounded mt-2 text-white font-bold">
              Connected as: {user.name} ({user.email})
            </div>
          )}
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg p-3 ${getMessageStyle(message.type)}`}
              >
                {message.type !== "system" && (
                  <div className="text-xs opacity-70 mb-1">
                    {message.username} • {formatTime(message.timestamp)}
                  </div>
                )}
                <div className="break-words">{message.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                loading
                  ? "Loading profile..."
                  : isConnected
                  ? "Type your message..."
                  : "Connecting..."
              }
              disabled={!isConnected || loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!isConnected || !inputMessage.trim() || loading}
              size="sm"
              className="gap-1"
            >
              <Send size={16} color="white" />
            </Button>
          </form>

          {/* Footer Info */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Connected as: {USERNAME}</span>
            <div className="flex gap-4">
              <span>{messageCount} messages</span>
              <button
                onClick={handleClearMessages}
                className="hover:text-gray-700 underline"
              >
                Clear chat
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}