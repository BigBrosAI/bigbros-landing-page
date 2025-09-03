import { NextResponse } from 'next/server';
import { mockTemplates } from '@/data/mock-data';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    success: true,
    data: mockTemplates
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newTemplate = {
    id: `tpl_${Date.now()}`,
    ...body,
    status: 'draft',
    lastModified: new Date(),
    createdAt: new Date()
  };
  
  return NextResponse.json({
    success: true,
    data: newTemplate
  });
}