"use client";

import React, { useState } from "react";
import { TextField, Button, Flex, Callout, Text } from "@radix-ui/themes";
import { IoMdInformationCircleOutline } from "react-icons/io";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Type your description here..." />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
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
