import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { BiSolidEditAlt } from "react-icons/bi";

const EditIssueButton = ({ issueId }: { issueId: Number }) => {
  return (
    <Button>
      <BiSolidEditAlt />
      <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
    </Button>
  );
};

export default EditIssueButton;
