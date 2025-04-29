import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import IssueTableRow from "./_components/IssueTableRow";

const IssuesPage = async () => {
  const issues: Issue[] = await prisma.issue.findMany();
  return (
    <div className="flex-col space-y-3.5">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <IssueTableRow key={issue.id} issue={issue} />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
