import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
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
    <Card>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" className="mb-3 items-center">
        <IssueStatusBadge status={issue.status} />
        <Text size={"1"}>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <p>{issue.description}</p>
    </Card>
  );
};

export default IssueDetailPage;
