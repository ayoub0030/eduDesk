"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TranscriptEntry, transcriptStore } from "@/services/transcript-store";
import { Send, Bot, User, Loader2, Info, X, AlertCircle, FileText, Trash2, RefreshCw, Youtube } from "lucide-react";
import { streamGeminiResponse } from "@/services/gemini-ai";
import { FlipCards } from "./flip-cards";
import { VideoGenerationForm } from "./video-generation-form";
import { PythonExercises } from "./python-exercises";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  isError?: boolean;
}

interface VideoSelectionEntry extends TranscriptEntry {
  selected: boolean;
  title?: string;
}

interface MultiVideoChatProps {
  onError?: (error: string) => void;
}

export function MultiVideoChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  const [storedVideos, setStoredVideos] = useState<VideoSelectionEntry[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [showVideoGenerator, setShowVideoGenerator] = useState(false);
  const [isTranscriptSelectorOpen, setIsTranscriptSelectorOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load stored transcripts when component mounts
  useEffect(() => {
    const allTranscripts = transcriptStore.getAllTranscripts();
    
    // Convert to selection entries
    const videoEntries: VideoSelectionEntry[] = allTranscripts.map(transcript => ({
      ...transcript,
      selected: false,
      title: `Video ${transcript.videoId}`
    }));
    
    setStoredVideos(videoEntries);
  }, []);

  // Add system welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm your multi-video transcript analyst. First, select up to 3 videos to analyze, then ask me any questions about them.",
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus the input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Toggle video selection
  const toggleVideoSelection = (videoId: string) => {
    // Find if the video is already selected
    const isCurrentlySelected = selectedVideos.includes(videoId);
    
    if (isCurrentlySelected) {
      // Remove the video from selected list
      setSelectedVideos(prev => prev.filter(id => id !== videoId));
    } else {
      // Add the video to selected list if less than 3 videos are selected
      if (selectedVideos.length < 3) {
        setSelectedVideos(prev => [...prev, videoId]);
      }
    }
    
    // Update the stored videos selection state
    setStoredVideos(prev => 
      prev.map(video => 
        video.videoId === videoId 
          ? { ...video, selected: !isCurrentlySelected } 
          : video
      )
    );
  };

  // Get combined transcript content from selected videos
  const getCombinedTranscriptContext = useCallback(() => {
    let combinedContext = "";
    
    // Add each selected video's transcript to the context
    storedVideos.forEach(video => {
      if (video.selected) {
        combinedContext += `VIDEO: ${video.title || video.videoId}\n\n${video.transcript}\n\n`;
      }
    });
    
    return combinedContext;
  }, [storedVideos]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || loading || selectedVideos.length === 0) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "", isStreaming: true },
    ]);
    
    setLoading(true);
    setApiKeyError(false);
    
    // Create a combined transcript context
    const transcriptContext = getCombinedTranscriptContext();
    
    // Current assistant message index
    const assistantMessageIndex = messages.length + 1; // +1 for the just added user message
    
    // Stream the response
    try {
      let accumulatedResponse = "";
      let isApiKeyError = false;
      
      await streamGeminiResponse(
        transcriptContext,
        userMessage,
        (chunk) => {
          // Check if it's an API key error
          if (chunk.includes("Gemini API key is not configured") || chunk.includes("API key not valid")) {
            isApiKeyError = true;
            setApiKeyError(true);
          }
          
          accumulatedResponse += chunk;
          
          setMessages((prev) => {
            const updated = [...prev];
            updated[assistantMessageIndex] = {
              role: "assistant",
              content: accumulatedResponse,
              isStreaming: true,
              isError: isApiKeyError
            };
            return updated;
          });
        }
      );
      
      // Complete the streaming
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantMessageIndex] = {
          role: "assistant",
          content: accumulatedResponse,
          isStreaming: false,
          isError: apiKeyError
        };
        return updated;
      });
    } catch (error) {
      console.error("Error getting response:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      const isApiKeyError = errorMessage.includes("Gemini API key") || errorMessage.includes("API key");
      
      if (isApiKeyError) {
        setApiKeyError(true);
      }
      
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantMessageIndex] = {
          role: "assistant",
          content: isApiKeyError 
            ? "Gemini API key is not configured or invalid. Please check your .env file and restart the server."
            : "Sorry, I encountered an error while analyzing the transcripts. Please try again.",
          isStreaming: false,
          isError: true
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // Close video generator
  const closeVideoGenerator = () => {
    setShowVideoGenerator(false);
  };

  // Clear the chat history
  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history cleared. What would you like to know about the selected videos?",
      },
    ]);
  };

  // Refresh the transcript list
  const refreshTranscriptList = () => {
    const allTranscripts = transcriptStore.getAllTranscripts();
    
    // Preserve selection state when refreshing
    const updatedEntries = allTranscripts.map(transcript => {
      const isSelected = selectedVideos.includes(transcript.videoId);
      return {
        ...transcript,
        selected: isSelected,
        title: `Video ${transcript.videoId}`
      };
    });
    
    setStoredVideos(updatedEntries);
  };

  return (
    <div className="border border-indigo-700/30 rounded-xl overflow-hidden shadow-lg bg-indigo-900/30 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-700/30 bg-indigo-900/70">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-yellow-400" />
          <h3 className="font-medium text-white">Multi-Video Analysis</h3>
          <div className="ml-2 px-2 py-0.5 bg-indigo-700/50 text-indigo-100 rounded-full text-xs border border-indigo-600/30">
            Gemini AI
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            disabled={messages.length <= 1}
            className="h-8 text-xs bg-indigo-800/50 border-indigo-600/30 text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear Chat
          </Button>
        </div>
      </div>
      
      {/* Transcript Selector - Now placed in a collapsible section */}
      <div className="border-b border-indigo-700/30 bg-indigo-900/60">
        <div className="p-3 flex justify-between items-center cursor-pointer" 
             onClick={() => setIsTranscriptSelectorOpen(!isTranscriptSelectorOpen)}>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-yellow-400" />
            <h4 className="font-medium text-indigo-100">Available Transcripts</h4>
            <span className="ml-2 text-xs text-indigo-300">
              {selectedVideos.length} of {storedVideos.length} selected
            </span>
          </div>
          <div className={`transform transition-transform ${isTranscriptSelectorOpen ? 'rotate-180' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300" />
            </svg>
          </div>
        </div>
        
        {/* Collapsible Transcript List */}
        {isTranscriptSelectorOpen && (
          <div className="p-3 border-t border-indigo-700/30 bg-indigo-900/30">
            {storedVideos.length === 0 ? (
              <div className="text-sm text-indigo-300 p-3 bg-indigo-800/30 rounded border border-indigo-700/30 text-center">
                No video transcripts available. View transcripts for videos first.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {storedVideos.map((video) => (
                    <div 
                      key={video.videoId}
                      className={`p-2 rounded border transition-colors flex items-start gap-2 ${
                        video.selected ? 'bg-indigo-700/40 border-indigo-500/50' : 'bg-indigo-800/30 border-indigo-700/30 hover:bg-indigo-800/50'
                      }`}
                    >
                      <Checkbox 
                        id={`video-${video.videoId}`}
                        checked={video.selected}
                        onCheckedChange={() => toggleVideoSelection(video.videoId)}
                        disabled={!video.selected && selectedVideos.length >= 3}
                        className="mt-1 border-indigo-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-indigo-900"
                      />
                      <div className="flex-1 min-w-0">
                        <label 
                          htmlFor={`video-${video.videoId}`}
                          className="block text-sm font-medium mb-1 cursor-pointer text-white"
                        >
                          {video.title || `Video ${video.videoId.substring(0, 8)}...`}
                        </label>
                        <div className="flex items-center text-xs text-indigo-300">
                          <Youtube className="h-3 w-3 mr-1 text-red-400" />
                          <span className="truncate">{video.videoId}</span>
                        </div>
                        <div className="text-xs text-indigo-300 mt-1">
                          {new Date(video.fetchedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-indigo-300 flex items-center">
                  <Info className="h-3.5 w-3.5 mr-1 text-yellow-400" />
                  <p>Select up to 3 videos for multi-transcript analysis</p>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={refreshTranscriptList}
                    className="h-7 text-xs text-indigo-300 hover:text-white hover:bg-indigo-800/50"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh List
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Video selection info - Now a prominent banner */}
      <div className={`p-3 border-b border-indigo-700/30 flex items-start ${
        selectedVideos.length > 0 ? 'bg-indigo-800/30 text-indigo-100' : 'bg-yellow-400/10 text-yellow-300'
      }`}>
        {selectedVideos.length > 0 ? (
          <div className="flex-1">
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="font-medium">
                Analyzing {selectedVideos.length} selected videos
              </span>
            </div>
            <div className="mt-1 ml-6 flex flex-wrap gap-1">
              {storedVideos
                .filter(v => v.selected)
                .map(v => (
                  <span key={v.videoId} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-700/50 text-indigo-100">
                    <span className="truncate max-w-[150px]">{v.title || `Video ${v.videoId.substring(0, 8)}...`}</span>
                    <button 
                      onClick={() => toggleVideoSelection(v.videoId)}
                      className="ml-1 text-indigo-300 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              }
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-yellow-400" />
            <span>Please select videos above to begin analysis</span>
          </div>
        )}
      </div>

      {/* API Key Error Banner */}
      {apiKeyError && (
        <div className="bg-red-900/20 p-2 text-xs text-red-400 flex items-start border-b border-red-800/30">
          <AlertCircle className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
          <div>
            <strong>Gemini API Key Issue:</strong> Your Gemini API key is either missing or invalid. 
            <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
              <li>Check that GEMINI_API_KEY is set correctly in your .env file</li>
              <li>Make sure the API key format is correct</li>
              <li>Restart your development server after making changes</li>
            </ul>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="flex flex-col h-[400px] bg-indigo-950/70">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[90%] p-4 shadow-md ${
                  message.role === 'user' 
                    ? 'bg-indigo-600 text-white border border-indigo-500 rounded-2xl rounded-br-sm' 
                    : message.isError 
                      ? 'bg-red-900/20 text-red-400 border border-red-800/30 rounded-2xl rounded-bl-sm' 
                      : 'bg-indigo-800/40 text-indigo-100 border border-indigo-700/30 rounded-2xl rounded-bl-sm'
                }`}
              >
                <div className={`flex items-center mb-1.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'user' ? (
                    <>
                      <span className="font-medium">You</span>
                      <User className="h-4 w-4 ml-1.5 text-indigo-300" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-1.5 text-yellow-400" />
                      <span className="font-medium">AI Assistant</span>
                    </>
                  )}
                </div>
                <div className="prose prose-sm max-w-none break-words prose-invert">
                  {message.isStreaming && message.content.length === 0 ? (
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '300ms' }}></div>
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-indigo-700/30 p-3 bg-indigo-900/50">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder={
                selectedVideos.length === 0 
                  ? "First, select videos above..." 
                  : "Ask a question about the selected videos..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-indigo-800/30 border-indigo-600/30 text-indigo-100 placeholder:text-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading || selectedVideos.length === 0}
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim() || selectedVideos.length === 0}
              className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Study Flip Cards */}
      {selectedVideos.length > 0 && messages.length > 1 && (
        <FlipCards transcriptContext={getCombinedTranscriptContext()} />
      )}

      {/* Python Exercises */}
      {selectedVideos.length > 0 && messages.length > 1 && (
        <PythonExercises transcriptContext={getCombinedTranscriptContext()} />
      )}

      {/* Video Generator (shown below chat when active) */}
      {showVideoGenerator && (
        <VideoGenerationForm 
          transcriptContext={getCombinedTranscriptContext()}
          onClose={closeVideoGenerator}
        />
      )}
    </div>
  );
}
