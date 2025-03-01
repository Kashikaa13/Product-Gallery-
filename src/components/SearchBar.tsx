
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 items-center w-full md:w-80">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-8 bg-secondary/50 border-none h-10 shadow-sm backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-primary/30"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <Button
        onClick={handleSearch}
        variant="outline"
        className="bg-secondary/50 border-none h-10 px-3 shadow-sm backdrop-blur-sm hover:bg-secondary/80 transition-all duration-300"
        aria-label="Search"
      >
        <Search size={18} />
      </Button>
    </div>
  );
};

export default SearchBar;
