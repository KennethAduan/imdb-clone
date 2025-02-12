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
  }, 500);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Search className="w-4 h-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <SearchInput
            className="w-full mt-4"
            placeholder="Enter keywords..."
            onChange={handleSearch}
            data-testid="search-input"
          />
        </DialogHeader>
        <DialogFooter className="mt-4 ">
          <Button
            data-testid="close-button"
            className="w-full"
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
