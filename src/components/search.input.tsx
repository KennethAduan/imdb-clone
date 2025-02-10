import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchInput = ({
  placeholder = "The Dark Knight",
  value,
  onChange,
  className,
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-8 h-4 w-4 -translate-y-1/2 text-muted-foreground md:top-1/2"
        aria-hidden="true"
        data-testid="search-icon"
      />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          "pl-9",
          className,
          "bg-gray-200 dark:bg-black border-none shadow-none",
          "focus-visible:ring-gray-200 focus-visible:ring-2 focus-visible:ring-offset-0"
        )}
        aria-label="Search input"
      />
    </div>
  );
};

export default SearchInput;
