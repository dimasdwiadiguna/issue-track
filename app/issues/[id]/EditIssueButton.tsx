import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { BiSolidEditAlt } from "react-icons/bi";

const EditIssueButton = ({ issueId }: { issueId: Number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`} className="w-fit">
      <Button>
        {" "}
        <BiSolidEditAlt />
        Edit
      </Button>
    </Link>
  );
};

export default EditIssueButton;
