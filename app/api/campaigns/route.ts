import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/data/mock-data';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    success: true,
    data: mockCampaigns
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Simulate creating a new campaign
  const newCampaign = {
    id: `camp_${Date.now()}`,
    ...body,
    sent: 0,
    delivered: 0,
    read: 0,
    clicked: 0,
    conversions: 0,
    createdAt: new Date()
  };
  
  return NextResponse.json({
    success: true,
    data: newCampaign
  });
}