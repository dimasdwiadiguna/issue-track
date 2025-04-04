import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "blue" | "gray" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <div>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  );
};

export default IssueStatusBadge;
