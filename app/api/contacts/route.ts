import { NextResponse } from 'next/server';
import { mockContacts } from '@/data/mock-data';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    success: true,
    data: mockContacts
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newContact = {
    id: `con_${Date.now()}`,
    ...body,
    lastActive: new Date(),
    optedIn: true,
    createdAt: new Date()
  };
  
  return NextResponse.json({
    success: true,
    data: newContact
  });
}