import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { BiSolidEditAlt } from "react-icons/bi";
import Link from "next/link";
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
          <Button>
            <BiSolidEditAlt />
            <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
