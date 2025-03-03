"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Search, ThumbsUp, Eye, Clock, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { formatDistance, format } from "date-fns";
import { TranscriptViewer } from "@/components/transcript-viewer";
import { transcriptStore } from "@/services/transcript-store";
import { MultiVideoChat } from "@/components/multi-video-chat";

// Safely import Image with a fallback
const ImageComponent = dynamic(
  () => import('next/image').then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => <div className="w-[100px] h-[56px] bg-muted flex items-center justify-center">Loading...</div>,
  }
);

interface YouTubeVideo {
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount?: string;
  likeCount?: string;
  duration?: string;
  url: string;
  viewedAt: string;
  appName?: string;
  windowName?: string;
  frameId?: number;
}

interface FilterOptions {
  videoId?: string;
  channelName?: string;
  specificUrl?: string;
}

// Format large numbers with commas
function formatNumber(num: string | undefined): string {
  if (!num) return '-';
  return parseInt(num).toLocaleString();
}

// Format ISO8601 duration to human-readable format
function formatDuration(duration: string | undefined): string {
  if (!duration) return '-';
  
  // Parse PT1H2M3S format (ISO 8601 duration)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export function YouTubeVideosTable({ 
  sessionStartTime,
  limit = 10
}: { 
  sessionStartTime?: string;
  limit?: number;
}) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filterInput, setFilterInput] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "videoId" | "channelName" | "specificUrl">("all");
  
  // State for transcript viewing
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
  const [hasTranscript, setHasTranscript] = useState<Record<string, boolean>>({});

  // Check which videos have transcripts stored
  useEffect(() => {
    const transcripts = transcriptStore.getAllTranscripts();
    const transcriptMap: Record<string, boolean> = {};
    
    transcripts.forEach(transcript => {
      transcriptMap[transcript.videoId] = true;
    });
    
    setHasTranscript(transcriptMap);
  }, [selectedVideoId]);

  const fetchYouTubeData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the API route
      const params = new URLSearchParams();
      if (sessionStartTime) params.append('startTime', sessionStartTime);
      if (limit) params.append('limit', limit.toString());
      
      // Add any active filters
      if (filters.videoId) params.append('videoId', filters.videoId);
      if (filters.channelName) params.append('channelName', filters.channelName);
      if (filters.specificUrl) params.append('specificUrl', filters.specificUrl);
      
      const response = await fetch(`/api/youtube-videos?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch YouTube data: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setVideos(result.data);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("Error fetching YouTube data:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Select a video and fetch its transcript
  const selectVideo = (videoId: string, videoTitle: string) => {
    setSelectedVideoId(videoId);
    setSelectedVideoTitle(videoTitle);
  };

  // Close the transcript viewer
  const closeTranscriptViewer = () => {
    setSelectedVideoId(null);
    setSelectedVideoTitle("");
  };

  // Apply a filter
  const applyFilter = () => {
    const newFilters: FilterOptions = {};
    
    if (activeFilter === "videoId") {
      newFilters.videoId = filterInput;
    } else if (activeFilter === "channelName") {
      newFilters.channelName = filterInput;
    } else if (activeFilter === "specificUrl") {
      newFilters.specificUrl = filterInput;
    }
    
    setFilters(newFilters);
    fetchYouTubeData();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setFilterInput("");
    setActiveFilter("all");
    fetchYouTubeData();
  };

  useEffect(() => {
    fetchYouTubeData();
  }, [sessionStartTime, limit]);

  return (
    <div className="w-full space-y-4">
      {/* Transcript viewer modal */}
      {selectedVideoId && (
        <TranscriptViewer 
          videoId={selectedVideoId} 
          videoTitle={selectedVideoTitle}
          onClose={closeTranscriptViewer} 
        />
      )}
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">YouTube Videos</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchYouTubeData} 
          disabled={loading}
          className="bg-indigo-500/20 border-indigo-400/30 text-indigo-100 hover:text-white hover:bg-indigo-500/30 "
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
            
            </>
          )}
        </Button>
      </div>

      {/* Stored Transcripts Summary */}
      <div className="text-sm text-indigo-300 mb-2">
        {Object.keys(hasTranscript).length > 0 && (
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{Object.keys(hasTranscript).length} </span>
          </div>
        )}
      </div>

      {error ? (
        <div className="rounded-md bg-red-900/20 p-4 border border-red-700/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : (
        <div>
          {videos.length === 0 && !loading ? (
            <div className="px-4 py-6 text-center text-indigo-300 bg-indigo-900/30 rounded-xl border border-indigo-700/30">
              No YouTube videos found in recent screen captures
              {Object.keys(filters).length > 0 && " with the current filters"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div 
                  key={video.videoId} 
                  className="bg-indigo-900/30 border border-indigo-700/30 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-[180px] overflow-hidden">
                    {video.thumbnailUrl ? (
                      <div className="w-full h-full relative">
                        <ImageComponent 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-indigo-950 flex items-center justify-center">
                        No Thumbnail
                      </div>
                    )}
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {formatDuration(video.duration)}
                      </div>
                    )}
                    {hasTranscript[video.videoId] && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-indigo-900 text-xs px-2 py-1 rounded-md flex items-center font-medium">
                        <FileText className="h-3 w-3 mr-1" />
                        <span>Transcript</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <Link 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-yellow-300 transition-colors block text-white line-clamp-2 mb-2"
                    >
                      {video.title}
                    </Link>
                    
                    <div className="text-indigo-300 text-sm mb-3">{video.channelTitle}</div>
                    
                    <div className="flex items-center justify-between text-xs text-indigo-300 mb-4">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{formatNumber(video.viewCount)}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{formatNumber(video.likeCount)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {video.publishedAt 
                            ? format(new Date(video.publishedAt), 'MMM d, yyyy')
                            : '-'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => window.open(video.url, '_blank')}
                        className="shadow-sm h-8 px-3 flex-1 text-xs bg-indigo-600 hover:bg-indigo-700"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" /> Watch
                      </Button>
                      <Button
                        variant={hasTranscript[video.videoId] ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => selectVideo(video.videoId, video.title)}
                        className={`shadow-sm h-8 px-3 flex-1 text-xs ${
                          hasTranscript[video.videoId] 
                            ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30 border-yellow-400/30" 
                            : "bg-indigo-800/50 text-indigo-300 hover:text-white hover:bg-indigo-800/70 border-indigo-700/50"
                        }`}
                      >
                        <FileText className={`h-3 w-3 mr-1 ${
                          hasTranscript[video.videoId] ? "text-yellow-300" : ""
                        }`} /> 
                        Transcript
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Multi-Video Chat Section */}
      <div className="mt-8 p-6 bg-indigo-900/30 border border-indigo-700/30 rounded-xl">
        <h3 className="text-lg font-medium mb-2 text-white">Multi-Video Analysis</h3>
        <p className="text-sm text-indigo-300 mb-4">
          Select up to 3 videos from the cards above by using their transcript buttons, then analyze them together with Gemini AI.
        </p>
        <MultiVideoChat />
      </div>
    </div>
  );
}
