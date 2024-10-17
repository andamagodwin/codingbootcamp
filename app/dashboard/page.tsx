'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await fetch('/api/progress');
      const data = await response.json();
      setProgress(data.progress);
    };
    fetchProgress();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name}!</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className="mt-2">You've completed {progress}% of the course</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">HTML Basics</h3>
          <p className="mb-4">Learn the fundamentals of HTML</p>
          <Button onClick={() => router.push('/lessons/html-basics')}>Start Lesson</Button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">HTML Forms</h3>
          <p className="mb-4">Master creating forms in HTML</p>
          <Button onClick={() => router.push('/lessons/html-forms')}>Start Lesson</Button>
        </div>
      </div>
    </div>
  );
}