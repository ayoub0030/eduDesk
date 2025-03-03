"use client";

import { SettingsProvider } from "@/lib/settings-provider";
import { LastOcrImage } from "@/components/ready-to-use-examples/last-ocr-image";
import { HealthStatus } from "@/components/ready-to-use-examples/health-status";
import { LastUiRecord } from "@/components/ready-to-use-examples/last-ui-record";
import { SimpleHealthStatus } from "@/components/simple-health-status";
import { PlaygroundCard } from "@/components/playground-card";
import { OcrImageDisplay } from "@/components/ocr-image-display";
import { GeminiChat } from "@/components/gemini-chat";
import { ClientOnly } from "@/lib/client-only";
import { OcrProvider } from "@/lib/ocr-context";
import { YouTubeVideosTable } from "@/components/youtube-videos-table";
import { AdTrackerDashboard } from "@/components/ad-tracker-dashboard";
import { Inter } from "next/font/google";
import healthStatusContent from '../content/health-status-card.json';
import { useEffect, useState } from "react";
import { Bot, FileText, CheckCircle } from "lucide-react";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

interface Pipe {
  id: string;
  name: string;
  description: string;
}

export default function Page() {
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://screenpi.pe/api/plugins/registry")
      .then((res) => res.json())
      .then((data) => {
        const transformedPipes = data.map((pipe: any) => ({
          id: pipe.id,
          name: pipe.name,
          description: pipe.description?.split('\n')[0] || ''
        }));
        setPipes(transformedPipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pipes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <SettingsProvider>
      <ClientOnly>
        <div id="top"></div>
        <div className={`flex flex-col gap-6 items-center justify-center h-full mt-12 px-4 pb-12 ${inter.className} bg-indigo-950 min-h-screen`}>
          
          {/* StudyTube Learning Assistant - Redesigned Hero Section */}
          <div className="w-full max-w-5xl">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-8 py-10 md:py-16 md:px-12">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    Transform Your Learning Journey with <span className="text-yellow-300">StudyTube</span>
                  </h1>
                  
                  <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                    Harness the power of AI to organize, comprehend, and master educational content from YouTube. 
                    Build your knowledge library and test your understanding with our intelligent study companion.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-400 rounded-lg p-2 mr-4">
                          <FileText className="h-5 w-5 text-indigo-900" />
                        </div>
                        <h3 className="font-semibold text-white text-lg">Comprehensive Learning</h3>
                      </div>
                      <p className="text-indigo-100">
                        Organize educational videos, review AI-generated summaries and focus on what matters most.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-400 rounded-lg p-2 mr-4">
                          <Bot className="h-5 w-5 text-indigo-900" />
                        </div>
                        <h3 className="font-semibold text-white text-lg">Knowledge Testing</h3>
                      </div>
                      <p className="text-indigo-100">
                        Take AI-generated quizzes to test your understanding and track your progress across subjects.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm border border-indigo-700">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <span className="bg-yellow-400 text-indigo-900 rounded-full w-7 h-7 inline-flex items-center justify-center mr-3 text-sm font-bold">1</span>
                      Getting Started
                    </h3>
                    <ul className="space-y-3 text-indigo-100">
                      <li className="flex items-start">
                        <div className="bg-indigo-500/30 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-indigo-300" />
                        </div>
                        <span>Add YouTube educational videos to your personal study library</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-500/30 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-indigo-300" />
                        </div>
                        <span>Review video content with AI-enhanced summaries and highlights</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-500/30 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-indigo-300" />
                        </div>
                        <span>Take knowledge-check quizzes tailored to your learning materials</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-500/30 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-indigo-300" />
                        </div>
                        <span>Track your progress and focus on areas that need improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* YouTube Videos Table */}
          <div className="w-full max-w-4xl mt-4">
            <YouTubeVideosTable limit={10} />
          </div>

          
          
        </div>
      </ClientOnly>
    </SettingsProvider>
  );
}
