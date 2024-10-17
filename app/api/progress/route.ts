import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const totalLessons = 2; // Update this as you add more lessons
  const progress = (user.completedLessons.length / totalLessons) * 100;

  return NextResponse.json({ progress });
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { lessonCompleted } = await req.json();

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  if (!user.completedLessons.includes(lessonCompleted)) {
    user.completedLessons.push(lessonCompleted);
    await user.save();
  }

  return NextResponse.json({ message: 'Progress updated successfully' });
}