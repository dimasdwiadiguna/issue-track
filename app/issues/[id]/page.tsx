import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
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
    <div className="flex-col space-y-5">
      <Heading>{issue.title}</Heading>
      <Flex gap="2" className="mb-3" style={{ alignItems: "baseline" }}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"1"}>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Grid columns={{ initial: "1", sm: "2" }} gap="5">
        <Box>
          <Card className="w-full prose text-sm">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
