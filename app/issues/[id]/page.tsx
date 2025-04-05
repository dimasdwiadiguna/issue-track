import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { parse } from "path";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params; //new next js requiring await for params
  if (isNaN(Number(id))) notFound(); //catching non number id params

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
