import enumKeys from "@/app/utils/enumKeys";
import { $Enums, Status } from "@prisma/client";
import { SegmentedControl } from "@radix-ui/themes";
import React from "react";

interface IIssueStatusTab {
  value?: $Enums.Status;
  register?: () => void;
  onChange?: (value: string) => void;
}

const IssueStatusTab = ({ value, onChange }: IIssueStatusTab) => {
  return (
    <SegmentedControl.Root value={value} onValueChange={onChange}>
      {enumKeys($Enums.Status).map((item) => (
        <SegmentedControl.Item key={item} value={item}>
          {item}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
};

export default IssueStatusTab;
