import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  console.log(body);
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json("Invalid issue", { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(request.nextUrl.searchParams);
  const id = (await params).id;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json("Invalid issue", { status: 404 });

  return NextResponse.json(issue, { status: 200 });
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log("Server is deleting...");
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json("Invalid issue", { status: 404 });
  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(deletedIssue, { status: 200 });
};
