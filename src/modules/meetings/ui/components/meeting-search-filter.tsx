import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useMeetingsFilters } from "../../hook/use-meetings-filters";

export const MeetingSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Enter meeting name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="w-[200px] bg-white h-9 pl-7"
      />
      <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}