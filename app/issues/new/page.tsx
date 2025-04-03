"use client";

import React, { useState } from "react";
import { TextField, Button, Flex, Callout } from "@radix-ui/themes";
import { IoMdInformationCircleOutline } from "react-icons/io";

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
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h1>New Issue</h1>
      {error && (
        <Callout.Root variant="surface" color="crimson" size="1">
          <Callout.Icon>
            <IoMdInformationCircleOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
      >
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
        <Flex className="flex gap-1.5">
          <Button type="submit">Submit issue</Button>
          <Button type="button" variant="soft" onClick={() => reset()}>
            Reset
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default NewIssuePage;
