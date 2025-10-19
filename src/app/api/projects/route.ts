import { type NextRequest, NextResponse } from 'next/server'
import { fetchProjects } from '@/lib/data'


export async function GET(request: NextRequest) {
  throw new Error("test event!");
  // const projectData = await fetchProjects();

  // return new NextResponse.json(projectData);

};

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Not Implemented' }, { status: 400 });
};
