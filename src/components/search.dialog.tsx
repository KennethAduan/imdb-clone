"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import SearchInput from "./search.input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./ui/button";

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("title", search);
    } else {
      params.delete("title");
    }
    setOpen(false);
    replace(`/search/?${params.toString()}`);
  }, 300);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Search className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <SearchInput
            className="mt-4 w-full"
            placeholder="Search movie title"
            onChange={handleSearch}
            data-testid="search-input"
          />
        </DialogHeader>
        <DialogFooter className="w-1/3 mt-4">
          <Button
            data-testid="close-button"
            variant={"secondary"}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
