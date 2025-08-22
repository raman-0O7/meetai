"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hook/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export const AgentView = () => {
   const router = useRouter();
   const trpc = useTRPC();
   const [filters, setFilters] = useAgentsFilters();
   const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
      ...filters
   }));

   return (
      <div className="flex-1 pb-y px-4 md:px-8 flex flex-col gap-y-4">
         <DataTable
            data={data.items} 
            columns={columns} 
            onRowClick={(row) => router.push(`/agents/${row.id}`)}
         />
         <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
         />
         {data.items.length === 0 && (
            <EmptyState
               title="Create your first agent"
               description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
            />
         )}
      </div>
   )
}

export const AgentViewLoading = () => {
   return (
      <LoadingState
         title="Loading Agents"
         description="This may takes a few seconds"
      />
   )
}

export const AgentViewError = () => {
   return (
      <ErrorState
         title="Error Loading Agents"
         description="Please try again later"
      />
   )
}