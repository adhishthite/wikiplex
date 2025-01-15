import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-57px)] bg-background px-4">
      <h1 className="text-6xl font-bold mb-8 text-primary">WikiPlex</h1>
      <div className="w-full max-w-3xl">
        <form className="flex space-x-2" action="/search" method="GET">
          <Input
            type="search"
            name="q"
            placeholder="Search WikiPlex..."
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
}
