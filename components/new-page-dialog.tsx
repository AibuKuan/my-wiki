"use client";

import { handleCreatePage } from "@/actions/page";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FieldGroup, Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState, useEffect, useState } from "react";
import { PageNesting } from "@/types/page";

export default function NewPageDialog({
  children,
  parent = null,
}: {
  children: React.ReactNode;
  parent?: PageNesting | null;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(handleCreatePage, null);

  useEffect(() => {
    if (state?.success) {
      setOpen(false); // Close the dialog
      // You might also want to reset the form or show a toast here
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Create a new page here. Click create when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <div>
                <Label htmlFor="parent-display">Parent Page</Label>
                {/* This is what the user sees */}
                <Input
                  id="parent-display"
                  value={parent?.title ?? "Root"}
                  disabled
                  className="bg-muted"
                />

                <Label htmlFor="parent">Parent</Label>
                <Input
                  type='hidden'
                  name="parent"
                  defaultValue={parent?.id}
                />
              </div>
            </Field>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue="My Page" />
            </Field>
            {state?.error && (
              <p className="text-destructive text-sm">{state.error}</p>
            )}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
