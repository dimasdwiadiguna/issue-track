import { Skeleton } from "@/app/components";
import { Card, Flex } from "@radix-ui/themes";

const IssueDetailLoadingPage = () => {
  return (
    <Card
      variant="classic"
      className="max-w-2xl mx-auto"
      style={{ padding: "24px" }}
    >
      <Skeleton />
      <Flex gap="2" className="mb-3">
        <Skeleton width={40} />
        <Skeleton />
      </Flex>
      <Card className="prose">
        <Skeleton count={5} />
      </Card>
    </Card>
  );
};

export default IssueDetailLoadingPage;
