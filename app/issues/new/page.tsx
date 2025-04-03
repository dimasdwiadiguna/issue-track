"use client";

import React, { use } from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h1>New Issue</h1>
      <TextField.Root placeholder="Issue title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit issue</Button>
    </div>
  );
};

export default NewIssuePage;
