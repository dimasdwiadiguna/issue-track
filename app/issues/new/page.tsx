"use client";

import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit, reset } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl mx-auto space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <h1>New Issue</h1>
      <TextField.Root
        placeholder="Issue title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Type your description here..." />
        )}
      />

      <Button type="submit">Submit issue</Button>
      <Button type="button" onClick={() => reset()}>
        Reset
      </Button>
    </form>
  );
};

export default NewIssuePage;
