import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import axios from "axios";
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
    <Container size="3">
      <Heading>{issue.title}</Heading>
      <Flex gap="2" className="mb-3" style={{ alignItems: "baseline" }}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"1"}>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="col-span-4">
          <Card className="max-w-full prose text-sm">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Flex gap="2" className="flex-row md:flex-col">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} issueTitle={issue.title} />
        </Flex>
      </Grid>
    </Container>
  );
};

export default IssueDetailPage;
