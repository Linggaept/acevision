"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChatMessage,
  PieSocketMessage,
  ConnectionStatus,
  PieSocketConfig,
} from "../types/chat";

// Default config untuk PieSocket
const DEFAULT_CONFIG: PieSocketConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_PIESOCKET,
  baseUrl: process.env.NEXT_PUBLIC_API_URL_PIESOCKET,
  reconnectAttempts: 3,
  reconnectDelay: 3000,
};

export function usePieSocket(
  channelName: string,
  config: Partial<PieSocketConfig> = {}
) {
  // State dengan TypeScript
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isConnecting: false,
    hasError: false,
  });
  const [username, setUsername] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Refs dengan TypeScript
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const isConnectingRef = useRef<boolean>(false); // Prevent double connection

  // Merge config dengan default
  const finalConfig: PieSocketConfig = { ...DEFAULT_CONFIG, ...config };

  // Generate socket URL dengan type safety
  const getSocketUrl = useCallback(
    (channel: string): string => {
      const cleanChannel = channel.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
      return `${finalConfig.baseUrl}/${cleanChannel}?api_key=${finalConfig.apiKey}`;
    },
    [finalConfig]
  );

  // Helper function untuk add message dengan type safety
  const addMessage = useCallback((
    type: ChatMessage["type"],
    text: string,
    user: string = ""
  ): void => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      text,
      username: user || username,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  }, [username]);

  // Connect function dengan proper typing dan deduplication
  const connect = useCallback((user: string): void => {
    if (!user.trim()) {
      console.error("Username tidak boleh kosong");
      return;
    }

    // Prevent multiple simultaneous connections
    if (isConnectingRef.current || socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    isConnectingRef.current = true;
    setUsername(user);
    setConnectionStatus((prev) => ({
      ...prev,
      isConnecting: true,
      hasError: false,
    }));

    try {
      const socketUrl = getSocketUrl(channelName);

      socketRef.current = new WebSocket(socketUrl);

      socketRef.current.onopen = (): void => {
        isConnectingRef.current = false;
        setConnectionStatus({
          isConnected: true,
          isConnecting: false,
          hasError: false,
        });

        reconnectAttemptsRef.current = 0;
        addMessage("system", `${user} bergabung ke channel #${channelName}`, "System");

        // Add user to online users
        setOnlineUsers((prev) => new Set([...prev, user]));
      };

      socketRef.current.onmessage = (event: MessageEvent): void => {
        try {
          const data: PieSocketMessage = JSON.parse(event.data);

          // Jangan tampilkan pesan yang kita kirim sendiri
          if (data.username && data.username !== user) {
            addMessage("received", data.message, data.username);

            // Update online users
            setOnlineUsers((prev) => new Set([...prev, data.username]));
          }
        } catch (error) {
          console.error("Error parsing message:", error);
          addMessage("system", "❌ Error parsing incoming message", "System");
        }
      };

      socketRef.current.onclose = (event: CloseEvent): void => {
        isConnectingRef.current = false;
        
        setConnectionStatus({
          isConnected: false,
          isConnecting: false,
          hasError: event.code !== 1000, // 1000 = normal closure
        });

        addMessage(
          "system",
          `Connection closed ${event.code !== 1000 ? "(unexpected)" : ""}`,
          "System"
        );

        // Remove user from online users
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(user);
          return newSet;
        });

        // Auto-reconnect logic only if not a normal closure
        if (
          event.code !== 1000 &&
          reconnectAttemptsRef.current < finalConfig.reconnectAttempts
        ) {
          reconnectAttemptsRef.current += 1;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect(user);
          }, finalConfig.reconnectDelay);
        }
      };

      socketRef.current.onerror = (): void => {
        isConnectingRef.current = false;
        
        setConnectionStatus((prev) => ({
          ...prev,
          hasError: true,
          errorMessage: "Connection error occurred",
        }));
      };
    } catch (error) {
      console.error("❌ Failed to create WebSocket:", error);
      isConnectingRef.current = false;
      
      setConnectionStatus({
        isConnected: false,
        isConnecting: false,
        hasError: true,
        errorMessage:
          error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [channelName, finalConfig, getSocketUrl, addMessage]);

  // Send message function dengan validation dan deduplication
  const sendMessage = useCallback((text: string): boolean => {
    if (!text.trim()) {
      console.warn("Message cannot be empty");
      return false;
    }

    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      console.error("WebSocket is not connected");
      addMessage("system", "❌ Cannot send message: Not connected", "System");
      return false;
    }

    try {
      const messageData: PieSocketMessage = {
        message: text.trim(),
        username: username,
        timestamp: new Date().toISOString(),
        userId: `user_${Date.now()}`, // Simple user ID
      };

      socketRef.current.send(JSON.stringify(messageData));
      
      // Add sent message immediately to UI
      addMessage("sent", text.trim(), username);

      return true;
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      addMessage("system", "❌ Failed to send message", "System");
      return false;
    }
  }, [username, addMessage]);

  // Disconnect function
  const disconnect = useCallback((): void => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close(1000, "User disconnected");
      socketRef.current = null;
    }

    isConnectingRef.current = false;
    
    setConnectionStatus({
      isConnected: false,
      isConnecting: false,
      hasError: false,
    });

    if (username) {
      addMessage("system", `${username} left the channel`, "System");
    }
  }, [username, addMessage]);

  // Clear messages
  const clearMessages = useCallback((): void => {
    setMessages([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return (): void => {
      disconnect();
    };
  }, [disconnect]);

  // Return object dengan proper typing
  return {
    // State
    messages,
    connectionStatus,
    username,
    onlineUsers: Array.from(onlineUsers),

    // Actions
    connect,
    sendMessage,
    disconnect,
    clearMessages,

    // Computed values
    isConnected: connectionStatus.isConnected,
    isConnecting: connectionStatus.isConnecting,
    hasError: connectionStatus.hasError,
    errorMessage: connectionStatus.errorMessage,
    messageCount: messages.length,
    channelName,
  } as const; // 'as const' untuk readonly return type
}

// Export types untuk digunakan di component
export type UsePieSocketReturn = ReturnType<typeof usePieSocket>;