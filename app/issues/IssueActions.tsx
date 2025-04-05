import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div className="flex-col space-y-3">
      <h1>IssuesPage</h1>
      <Button>
        <Link href="/issues/new">Add new issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
