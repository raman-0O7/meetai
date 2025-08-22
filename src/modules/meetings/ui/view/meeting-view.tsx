"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingView = () => {
   const trpc = useTRPC();

   const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
   return (
      <div className="flex-1 px-4 md:px-8 gap-y-4 flex-col pb-4">
         <DataTable data={data.items} columns={columns} />
         {data.items.length === 0 && (
            <EmptyState
               title="Create your first meeting"
               description="Schedule a meeting to connect with others. Each meeting will allow you to colaborate, interact and share ideas with other in real time."
            />
         )}
      </div>
   )
}

export const MeetingViewLoading = () => {
   return (
      <LoadingState
         title="Loading Meetings"
         description="This may takes a few seconds"
      />
   )
}

export const MeetingViewError = () => {
   return (
      <ErrorState
         title="Error Loading Meetings"
         description="Please try again later"
      />
   )
}