"use client";

import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Issue } from "@prisma/client";

//Importing SimpleMDE dynamically to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  });

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
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Issue title"
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Type your description here..." />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex className="flex gap-1.5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting issue..." : "Submit issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
          <Button type="button" variant="soft" onClick={() => reset()}>
            Reset
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
