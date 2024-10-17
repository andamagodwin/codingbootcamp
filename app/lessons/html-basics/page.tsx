'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const htmlBasicsContent = `
  <h1>HTML Basics</h1>
  <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
  <h2>Basic Structure</h2>
  <pre><code>
  &lt;!DOCTYPE html&gt;
  &lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Your content goes here --&gt;
  &lt;/body&gt;
  &lt;/html&gt;
  </code></pre>
  <h2>Common HTML Tags</h2>
  <ul>
    <li>&lt;h1&gt; to &lt;h6&gt;: Headings</li>
    <li>&lt;p&gt;: Paragraph</li>
    <li>&lt;a&gt;: Link</li>
    <li>&lt;img&gt;: Image</li>
    <li>&lt;ul&gt; and &lt;ol&gt;: Unordered and Ordered Lists</li>
    <li>&lt;li&gt;: List Item</li>
  </ul>
`;

export default function HTMLBasics() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const questions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      correctAnswer: 0
    },
    {
      question: "Which tag is used for the largest heading in HTML?",
      options: ["<h6>", "<h1>", "<head>", "<header>"],
      correctAnswer: 1
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<hlink>", "<url>"],
      correctAnswer: 1
    }
  ];

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz finished
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonCompleted: 'html-basics' }),
      });
      router.push('/dashboard');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!quizStarted ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: htmlBasicsContent }} className="prose max-w-none mb-8" />
          <Button onClick={handleStartQuiz}>Start Quiz</Button>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <p className="mb-4">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-xl mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button key={index} onClick={() => handleAnswer(index)} className="w-full text-left justify-start">
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}