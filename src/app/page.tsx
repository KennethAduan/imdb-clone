import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen p-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold tracking-tight">Movie Search</h1>

        <div className="flex w-full max-w-lg gap-2">
          <Input
            type="search"
            placeholder="Search for movies..."
            className="flex-1"
          />
          <Button>Search</Button>
        </div>
      </div>
    </main>
  );
}
