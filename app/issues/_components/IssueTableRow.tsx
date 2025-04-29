"use client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Link, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface IIssueTableRow {
  issue: Issue;
}

const IssueTableRow = ({ issue }: IIssueTableRow) => {
  const router = useRouter();
  return (
    <Table.Row
      className="hover:bg-gray-100 hover:cursor-pointer transition-colors duration-150"
      onClick={() => router.push(`/issues/${issue.id}`)}
    >
      <Table.Cell>
        <p>{issue.title}</p>
        <div className="md:hidden">
          <IssueStatusBadge status={issue.status} />
        </div>
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        <IssueStatusBadge status={issue.status} />
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        {issue.createdAt.toDateString()}
      </Table.Cell>
    </Table.Row>
  );
};

export default IssueTableRow;
