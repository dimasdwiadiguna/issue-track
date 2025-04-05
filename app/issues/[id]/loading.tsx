import { Card, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
