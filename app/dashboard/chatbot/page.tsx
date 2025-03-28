"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Trash, ChevronDown, Video, BookOpen } from "lucide-react";

// Define custom blue colors
const blueColor = "#1E40AF";
const darkBlueColor = "#1E3A8A";

export default function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [transcripts, setTranscripts] = useState([]);
  const [selectedTranscripts, setSelectedTranscripts] = useState([]);
  const [isTranscriptsOpen, setIsTranscriptsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: "bot", 
      content: "Hello! I'm your study companion. I can help you understand concepts, create summaries, and answer your study-related questions. Select up to 3 videos to analyze, then let's start learning together!" 
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", content: message }]);
    
    // Clear input
    setMessage("");
    
    // Simulate bot response after a short delay
    
  };

  const clearChat = () => {
    setChatHistory([{ 
      sender: "bot", 
      content: "Hello! I'm your study companion. I can help you understand concepts, create summaries, and answer your study-related questions. Select up to 3 videos to analyze, then let's start learning together!" 
    }]);
  };

  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Teacher GPT</h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Chat header */}
          <div className="p-4 bg-blue-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Study Companion</span>
              <span className="text-sm bg-blue-400 bg-opacity-20 px-2 py-0.5 rounded">Gemini AI</span>
            </div>
            <button 
              onClick={clearChat}
              className="text-white hover:text-gray-200"
            >
              <Trash className="h-5 w-5" />
              <span className="ml-1">Clear Chat</span>
            </button>
          </div>
          
          
         
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-900 min-h-[300px] max-h-[400px]">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${chat.sender === "user" ? "" : ""}`}>
                  <div 
                    className={`rounded-lg px-4 py-3 ${
                      chat.sender === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-blue-800 text-white"
                    }`}
                  >
                    {chat.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium text-sm">Study Assistant</span>
                      </div>
                    )}
                    {chat.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <div className="p-4 border-t border-gray-200 bg-blue-900">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="First, select videos above..."
                  className="rounded-md border-gray-300 text-gray-200 bg-blue-800 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
              </div>
              
              <Button 
                className="rounded-md px-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
