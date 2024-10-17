import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-6">Learn to Code Bootcamp</h1>
      <p className="text-xl mb-8">Master HTML and web development</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}