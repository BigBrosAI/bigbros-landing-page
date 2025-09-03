import { NextResponse } from 'next/server';
import { mockAnalytics } from '@/data/mock-data';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    success: true,
    data: mockAnalytics
  });
}