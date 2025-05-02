"use client";

import Link from "next/link";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";

interface IDeleteIssueButton {
  issueId: number;
  issueTitle: string;
}

const DeleteIssueButton = ({ issueId, issueTitle }: IDeleteIssueButton) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const router = useRouter();
  const deleteIssue = async (id: number) => {
    try {
      //   throw new Error();
      setDeleting(true);
      console.log(`Requesting deletion of ${id}`);
      await axios.delete(`/api/issues/${id}`);
      router.push("/issues");
      router.refresh();
      setDeleting(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="tomato" disabled={isDeleting} className="max-w-fit">
            {isDeleting ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              <>
                <MdDeleteOutline />
                Delete
              </>
            )}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete "{issueTitle}" ?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action cannot be undone
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => deleteIssue(issueId)}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {/* Modal box when error */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error encountered</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Cannot deleting "{issueTitle}" due to error
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="center">
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="gray"
                onClick={() => setError(false)}
              >
                Ok
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
