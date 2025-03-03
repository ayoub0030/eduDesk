import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RefreshCw, Brain, BookOpen, HelpCircle, CheckCircle, ArrowRightCircle, ArrowLeftCircle, BookMarked, CircleOff, Lightbulb } from 'lucide-react';

interface FlipCardsProps {
  transcriptContext: string;
}

interface StudyCard {
  id: number;
  question: string;
  answer: string;
  category?: string;
  mastered: boolean;
}

export function FlipCards({ transcriptContext }: FlipCardsProps) {
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextCard();
      } else if (event.key === 'ArrowLeft') {
        prevCard();
      } else if (event.key === ' ' || event.key === 'Enter') {
        toggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCardIndex, cards.length]);

  // Generate study cards based on transcript content
  const generateStudyCards = useCallback(async () => {
    if (!transcriptContext || transcriptContext.trim() === '') {
      setError('No transcript content available to generate study cards');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // This is where you would normally make an API call to generate cards
      // For now, we'll simulate with some example cards about Python
      // In a real implementation, you would use the Gemini API to generate these
      
      // Python-specific study cards for the demo
      const pythonCards = [
        {
          id: 1,
          question: "What are Python variables and how are they declared?",
          answer: "Python variables are containers for storing data values. Unlike many other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it using the equals sign (=). Python uses dynamic typing, which means variables can change types after they have been set.",
          category: "Concept",
          mastered: false
        },
        {
          id: 2,
          question: "What are the basic data types in Python?",
          answer: "Python has several basic data types: int (integers), float (decimal numbers), str (strings), bool (boolean True/False), list (ordered, mutable collection), tuple (ordered, immutable collection), dict (key-value pairs), and set (unordered collection of unique items).",
          category: "Definition",
          mastered: false
        },
        {
          id: 3,
          question: "How do you define a function in Python?",
          answer: "Functions in Python are defined using the 'def' keyword, followed by the function name, parentheses containing any parameters, and a colon. The function body is indented below. For example: def greet(name): return f'Hello, {name}!'",
          category: "Example",
          mastered: false
        },
        {
          id: 4,
          question: "What are list comprehensions in Python?",
          answer: "List comprehensions are a concise way to create lists in Python. They consist of brackets containing an expression followed by a for clause, then zero or more for or if clauses. Example: [x**2 for x in range(10) if x % 2 == 0] creates a list of squares of even numbers from 0 to 9.",
          category: "Application",
          mastered: false
        },
        {
          id: 5,
          question: "How does Python handle exceptions?",
          answer: "Python uses try/except blocks to handle exceptions. Code that might raise an exception is placed in a try block, and exception handling code goes in the except block. You can catch specific exceptions or use a generic except to catch all. You can also include finally blocks that execute regardless of whether an exception occurred.",
          category: "Concept",
          mastered: false
        },
        {
          id: 6,
          question: "What is the difference between '==' and 'is' in Python?",
          answer: "'==' checks if two objects have the same value, while 'is' checks if two references point to the same object in memory. For example, a = [1, 2, 3] and b = [1, 2, 3] means a == b is True, but a is b is False because they are separate list objects with the same values.",
          category: "Definition",
          mastered: false
        },
        {
          id: 7,
          question: "How do decorators work in Python?",
          answer: "Decorators are functions that modify the behavior of other functions. They take a function as an argument, add some functionality, and return a new function. They are denoted with the '@' symbol. Decorators are commonly used for logging, authentication, and performance measurement without modifying the original function code.",
          category: "Application",
          mastered: false
        },
        {
          id: 8,
          question: "What are Python generators and how do they work?",
          answer: "Generators are functions that return an iterator that yields items one at a time. They use the 'yield' keyword instead of 'return'. Generators are memory efficient for working with large data sets because they generate values on-the-fly rather than storing all values in memory. Example: def count_up_to(n): i = 0; while i < n: yield i; i += 1",
          category: "Theory",
          mastered: false
        }
      ];
      
      setCards(pythonCards);
      setCurrentCardIndex(0);
      setFlipped(false);
    } catch (err) {
      setError('Failed to generate study cards. Please try again.');
      console.error('Error generating study cards:', err);
    } finally {
      setLoading(false);
    }
  }, [transcriptContext]);

  useEffect(() => {
    if (transcriptContext && transcriptContext.trim() !== '') {
      generateStudyCards();
    }
  }, [transcriptContext, generateStudyCards]);

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1 && !animating) {
      setAnimating(true);
      setFlipped(false);
      
      // Add a small delay to allow the flip animation to complete
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setAnimating(false);
      }, 200);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0 && !animating) {
      setAnimating(true);
      setFlipped(false);
      
      // Add a small delay to allow the flip animation to complete
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setAnimating(false);
      }, 200);
    }
  };

  const toggleFlip = () => {
    if (!animating) {
      setFlipped(!flipped);
    }
  };

  const toggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking mastered button
    
    const updatedCards = [...cards];
    updatedCards[currentCardIndex].mastered = !updatedCards[currentCardIndex].mastered;
    setCards(updatedCards);
  };

  if (cards.length === 0 && !loading && !error) {
    return (
      <div className="mt-6 border border-indigo-700/30 rounded-xl p-6 bg-indigo-900/30 text-center">
        <div className="flex justify-center mb-4">
          <BookOpen className="h-10 w-10 text-yellow-400" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Study Cards</h3>
        <p className="text-indigo-300 mb-4">
          Select videos above and analyze them to generate study cards for revision.
        </p>
        <Button
          onClick={generateStudyCards}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={!transcriptContext || transcriptContext.trim() === ''}
        >
          <Brain className="mr-2 h-4 w-4" />
          Generate Study Cards
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-6 border border-indigo-700/30 rounded-xl p-6 bg-indigo-900/30 text-center">
        <div className="animate-spin text-yellow-400 mb-4 flex justify-center">
          <RefreshCw size={24} />
        </div>
        <p className="text-indigo-300">Generating study cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 border border-indigo-700/30 rounded-xl p-6 bg-indigo-900/30 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Button 
          onClick={generateStudyCards}
          variant="outline"
          className="border-indigo-600/30 text-indigo-300 hover:text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  // Calculate progress
  const completedCards = cards.filter(card => card.mastered).length;
  const progressPercentage = Math.round((completedCards / cards.length) * 100);

  return (
    <div className="mt-6 border border-indigo-700/30 rounded-xl overflow-hidden shadow-lg bg-indigo-900/30">
      <div className="flex items-center justify-between p-4 border-b border-indigo-700/30 bg-indigo-900/70">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-yellow-400" />
          <h3 className="font-medium text-white">Study Cards</h3>
          <div className="ml-2 px-2 py-0.5 bg-indigo-700/50 text-indigo-100 rounded-full text-xs border border-indigo-600/30">
            {cards.length} cards
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generateStudyCards}
          className="h-8 text-xs bg-indigo-800/50 border-indigo-600/30 text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh Cards
        </Button>
      </div>

      <div className="p-6">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs text-indigo-300">Progress</div>
            <div className="text-xs text-indigo-300">{progressPercentage}% Complete</div>
          </div>
          <div className="h-2 w-full bg-indigo-800/50 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Card category and mastery status */}
        <div className="flex justify-between items-center mb-2">
          {cards[currentCardIndex]?.category && (
            <div className="text-xs px-2 py-1 rounded-full bg-indigo-800/50 text-indigo-300 border border-indigo-700/30">
              {cards[currentCardIndex]?.category}
            </div>
          )}

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMastered}
              className={`h-7 text-xs flex items-center gap-1 ${
                cards[currentCardIndex]?.mastered 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              {cards[currentCardIndex]?.mastered ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <CircleOff className="h-3.5 w-3.5" />
                  <span>Mark as Mastered</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Card navigation */}
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={prevCard}
            disabled={currentCardIndex === 0 || animating}
            variant="outline"
            className="border-indigo-600/30 text-indigo-300 hover:text-white disabled:opacity-50 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeftCircle className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-sm text-indigo-300">
            <span className="font-medium text-white">{currentCardIndex + 1}</span> / {cards.length}
          </div>
          
          <Button
            onClick={nextCard}
            disabled={currentCardIndex === cards.length - 1 || animating}
            variant="outline"
            className="border-indigo-600/30 text-indigo-300 hover:text-white disabled:opacity-50 transition-all duration-200 hover:scale-105"
          >
            Next
            <ArrowRightCircle className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Flip card */}
        <div 
          ref={cardContainerRef}
          className="relative h-[240px] w-full mb-4 perspective-1000 cursor-pointer"
          onClick={toggleFlip}
          style={{ perspective: '1000px' }}
        >
          <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
            {/* Front of card */}
            <div className="flip-card-front">
              <Card className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 border-indigo-700/30 shadow-lg">
                <div className="absolute top-4 left-4">
                  <HelpCircle className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="text-center max-w-md">
                  <h4 className="text-lg font-medium text-white mb-3">Question:</h4>
                  <p className="text-indigo-100 text-base">{cards[currentCardIndex]?.question}</p>
                  <div className="absolute bottom-4 right-4 animate-pulse">
                    <Lightbulb className="h-5 w-5 text-yellow-400/70" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Back of card */}
            <div className="flip-card-back">
              <Card className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700/80 to-purple-800/80 border-indigo-600/30 shadow-lg">
                <div className="absolute top-4 left-4">
                  <BookMarked className="h-6 w-6 text-indigo-300" />
                </div>
                <div className="text-center max-w-md">
                  <h4 className="text-lg font-medium text-white mb-3">Answer:</h4>
                  <p className="text-indigo-100 text-base">{cards[currentCardIndex]?.answer}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Click indicator */}
          <div className="absolute bottom-3 w-full text-center text-xs text-indigo-300/70">
            Click card to flip {flipped ? 'back' : ''}
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-2 text-center text-xs text-indigo-400/70">
          <span className="px-1.5 py-0.5 rounded bg-indigo-800/30 border border-indigo-700/30 mr-1">←</span> 
          <span className="mr-2">Previous</span>
          
          <span className="px-1.5 py-0.5 rounded bg-indigo-800/30 border border-indigo-700/30 mr-1">→</span> 
          <span className="mr-2">Next</span>
          
          <span className="px-1.5 py-0.5 rounded bg-indigo-800/30 border border-indigo-700/30 mr-1">Space</span> 
          <span>Flip</span>
        </div>
      </div>

      {/* Add a style tag for the flip animation */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
