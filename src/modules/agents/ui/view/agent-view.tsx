"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentView = () => {
   const trpc = useTRPC();

   const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

   return (
      <div className="flex-1 pb-y px-4 md:px-8 flex flex-col gap-y-4">
         <DataTable data={data} columns={columns}/>
         {data.length === 0 && (
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