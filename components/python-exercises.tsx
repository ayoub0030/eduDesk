import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Code, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Trophy,
  ArrowRight,
  TerminalSquare,
  PlayCircle,
  Lightbulb
} from 'lucide-react';

// Mock exercises related to Python learning
const mockExercises = [
  {
    id: 1,
    title: 'Variables and Data Types',
    description: 'Create variables to store different data types in Python.',
    problem: `# Create the following variables:
# 1. An integer variable named 'age' with the value 25
# 2. A float variable named 'height' with the value 5.9
# 3. A string variable named 'name' with your name
# 4. A boolean variable named 'is_student' set to True

# Your code below:


`,
    solution: `# Solution
age = 25
height = 5.9
name = "John Doe"
is_student = True

print(f"Age: {age}, type: {type(age)}")
print(f"Height: {height}, type: {type(height)}")
print(f"Name: {name}, type: {type(name)}")
print(f"Is Student: {is_student}, type: {type(is_student)}")`,
    hint: 'Remember that Python is dynamically typed, so you don\'t need to declare types explicitly.',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'List Manipulation',
    description: 'Practice working with lists in Python.',
    problem: `# Given the following list:
numbers = [10, 20, 30, 40, 50]

# Complete the following tasks:
# 1. Add the number 60 to the end of the list
# 2. Insert the number 15 between 10 and 20
# 3. Remove the number 30 from the list
# 4. Create a new list containing only numbers greater than 20
# 5. Calculate and print the sum of all numbers in the modified list

# Your code below:


`,
    solution: `# Solution
numbers = [10, 20, 30, 40, 50]

# Add 60 to the end
numbers.append(60)
print(f"After append: {numbers}")

# Insert 15 between 10 and 20
numbers.insert(1, 15)
print(f"After insert: {numbers}")

# Remove 30
numbers.remove(30)
print(f"After remove: {numbers}")

# Numbers greater than 20
greater_than_20 = [num for num in numbers if num > 20]
print(f"Numbers > 20: {greater_than_20}")

# Sum of all numbers
total = sum(numbers)
print(f"Sum of all numbers: {total}")`,
    hint: 'Look up methods like append(), insert(), remove(), and list comprehensions.',
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Functions and Conditionals',
    description: 'Create functions with conditional logic.',
    problem: `# Create a function called 'grade_calculator' that:
# 1. Takes a numerical score as an argument (0-100)
# 2. Returns the corresponding letter grade based on:
#    - A: 90-100
#    - B: 80-89
#    - C: 70-79
#    - D: 60-69
#    - F: Below 60
# 3. Handles invalid inputs (less than 0 or greater than 100)
#    by returning "Invalid score"

# Then test your function with scores: 95, 82, 71, 65, 45, and 105

# Your code below:


`,
    solution: `# Solution
def grade_calculator(score):
    if not isinstance(score, (int, float)):
        return "Invalid score"
    if score < 0 or score > 100:
        return "Invalid score"
    elif score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Test the function
test_scores = [95, 82, 71, 65, 45, 105]
for score in test_scores:
    print(f"Score: {score}, Grade: {grade_calculator(score)}")`,
    hint: 'Use if/elif/else statements to check different ranges of scores.',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    title: 'Loops and Iteration',
    description: 'Practice using loops to process data.',
    problem: `# Complete the following tasks:
# 1. Write a for loop to print all even numbers from 1 to 20
# 2. Write a while loop to find the sum of digits of a number
#    (e.g., sum of digits of 123 is 1+2+3 = 6)
# 3. Use a loop to create a dictionary where keys are numbers 1-10
#    and values are their squares
# 4. Use list comprehension to create a list of all numbers
#    divisible by 3 from 1 to 50

# Your code below:


`,
    solution: `# Solution
# 1. Print even numbers using for loop
print("Even numbers from 1 to 20:")
for num in range(1, 21):
    if num % 2 == 0:
        print(num, end=" ")
print()

# 2. Sum of digits using while loop
def sum_of_digits(number):
    total = 0
    while number > 0:
        total += number % 10
        number //= 10
    return total

print(f"Sum of digits of 123: {sum_of_digits(123)}")
print(f"Sum of digits of 9876: {sum_of_digits(9876)}")

# 3. Dictionary of squares
squares_dict = {}
for i in range(1, 11):
    squares_dict[i] = i ** 2
print(f"Dictionary of squares: {squares_dict}")

# 4. List comprehension for numbers divisible by 3
divisible_by_3 = [num for num in range(1, 51) if num % 3 == 0]
print(f"Numbers divisible by 3 from 1 to 50: {divisible_by_3}")`,
    hint: 'For the sum of digits problem, you can use modulo (%) and integer division (//) operations.',
    difficulty: 'Advanced'
  },
  {
    id: 5,
    title: 'Error Handling',
    description: 'Learn to handle exceptions in Python.',
    problem: `# Complete the following tasks:
# 1. Write a function 'safe_divide' that:
#    - Takes two parameters (a numerator and a denominator)
#    - Returns the result of division
#    - Handles ZeroDivisionError by returning "Cannot divide by zero"
#    - Handles TypeError by returning "Invalid input types"
# 2. Test your function with the following cases:
#    - 10 divided by 2
#    - 5 divided by 0
#    - "10" divided by 2
#    - 10 divided by "2"

# Your code below:


`,
    solution: `# Solution
def safe_divide(numerator, denominator):
    try:
        return numerator / denominator
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Invalid input types"
    except Exception as e:
        return f"Unexpected error: {str(e)}"

# Test cases
test_cases = [
    (10, 2),
    (5, 0),
    ("10", 2),
    (10, "2")
]

for n, d in test_cases:
    result = safe_divide(n, d)
    print(f"{n} divided by {d} = {result}")`,
    hint: 'Use try-except blocks to catch specific exceptions.',
    difficulty: 'Intermediate'
  }
];

interface PythonExercisesProps {
  transcript?: string;
  transcriptContext?: string;
}

export function PythonExercises({ transcript, transcriptContext }: PythonExercisesProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [userCode, setUserCode] = useState('');

  const exercises = mockExercises; // In a real app, this would be generated based on transcript

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setShowSolution(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setShowSolution(false);
      setShowHint(false);
    }
  };

  const toggleComplete = () => {
    if (completedExercises.includes(exercises[currentExercise].id)) {
      setCompletedExercises(completedExercises.filter(id => id !== exercises[currentExercise].id));
    } else {
      setCompletedExercises([...completedExercises, exercises[currentExercise].id]);
    }
  };

  const progressPercentage = (completedExercises.length / exercises.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-indigo-100 flex items-center">
          <TerminalSquare className="mr-2 text-indigo-400" size={22} />
          Python Coding Exercises
        </h2>
        <div className="flex items-center">
          <div className="mr-3 text-indigo-300 text-sm">
            {completedExercises.length} of {exercises.length} completed
          </div>
          <div className="w-32 h-2 bg-indigo-900 rounded-full">
            <div 
              className="h-2 bg-indigo-500 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-indigo-950 to-purple-900 border-indigo-700 shadow-lg overflow-hidden">
        {exercises.length > 0 ? (
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getDifficultyColor(exercises[currentExercise].difficulty)}`}>
                  {exercises[currentExercise].difficulty}
                </span>
                <h3 className="text-lg font-semibold text-indigo-100 mt-2 flex items-center">
                  <Lightbulb className="mr-2 text-indigo-300" size={18} />
                  {exercises[currentExercise].title}
                </h3>
                <p className="text-indigo-300 text-sm mt-1">
                  {exercises[currentExercise].description}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className={`border-indigo-500 ${
                  completedExercises.includes(exercises[currentExercise].id) 
                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                    : 'bg-indigo-800/30 text-indigo-300 hover:bg-indigo-700/30'
                }`}
                onClick={toggleComplete}
              >
                <CheckCircle2 className={`h-4 w-4 ${
                  completedExercises.includes(exercises[currentExercise].id) ? 'text-green-300' : 'text-indigo-400'
                } mr-1`} />
                {completedExercises.includes(exercises[currentExercise].id) ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-indigo-300 mb-2">
                <Code className="mr-2" size={16} />
                <span className="text-sm font-medium">Exercise Problem</span>
              </div>
              <div className="bg-indigo-950 rounded-lg border border-indigo-800 p-4 font-mono text-sm overflow-auto text-indigo-100" style={{maxHeight: '250px'}}>
                <pre>{exercises[currentExercise].problem}</pre>
              </div>
              
              {showHint && (
                <div className="mt-4 bg-yellow-900/30 border border-yellow-700/30 rounded-lg p-3">
                  <div className="flex items-center text-yellow-300 mb-1">
                    <BookOpen className="mr-2" size={16} />
                    <span className="text-sm font-medium">Hint</span>
                  </div>
                  <p className="text-yellow-100 text-sm">{exercises[currentExercise].hint}</p>
                </div>
              )}

              {showSolution && (
                <div className="mt-4">
                  <div className="flex items-center text-green-300 mb-2">
                    <CheckCircle2 className="mr-2" size={16} />
                    <span className="text-sm font-medium">Solution</span>
                  </div>
                  <div className="bg-indigo-950 rounded-lg border border-green-800/50 p-4 font-mono text-sm overflow-auto text-green-100" style={{maxHeight: '250px'}}>
                    <pre>{exercises[currentExercise].solution}</pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="bg-yellow-900/20 border-yellow-700/30 text-yellow-300 hover:bg-yellow-900/40 mr-2"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSolution(!showSolution)}
                  className="bg-green-900/20 border-green-700/30 text-green-300 hover:bg-green-900/40"
                >
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </Button>
              </div>
              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentExercise === 0}
                  onClick={handlePrevious}
                  className="bg-indigo-800/30 border-indigo-700 text-indigo-300 hover:bg-indigo-700/30 mr-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentExercise === exercises.length - 1}
                  onClick={handleNext}
                  className="bg-indigo-800/30 border-indigo-700 text-indigo-300 hover:bg-indigo-700/30"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 text-center text-xs text-indigo-400">
              Exercise {currentExercise + 1} of {exercises.length}
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-indigo-300">Please analyze a video to generate Python exercises.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
