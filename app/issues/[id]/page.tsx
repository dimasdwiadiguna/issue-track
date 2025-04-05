import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
    <Card
      variant="classic"
      className="max-w-2xl mx-auto"
      style={{ padding: "24px" }}
    >
      <Heading style={{ marginBottom: "4px" }}>{issue.title}</Heading>
      <Flex gap="2" className="mb-3" style={{ alignItems: "baseline" }}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"1"}>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Card>
  );
};

export default IssueDetailPage;
