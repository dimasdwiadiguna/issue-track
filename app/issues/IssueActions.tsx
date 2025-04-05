import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Heading style={{ marginBottom: "16px" }}>IssuesPage</Heading>
      <Button>
        <Link href="/issues/new">Add new issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
