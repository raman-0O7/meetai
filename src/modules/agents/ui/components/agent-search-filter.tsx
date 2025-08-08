import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hook/use-agents-filters"
import { SearchIcon } from "lucide-react";

export const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Enter agent name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="w-[200px] bg-white h-9 pl-7"
      />
      <SearchIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}