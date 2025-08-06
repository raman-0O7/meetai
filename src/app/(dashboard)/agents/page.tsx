import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentView, AgentViewError, AgentViewLoading } from "@/modules/agents/ui/view/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) {
      redirect("/sign-in");
   }
   const queryClient = await getQueryClient();
   void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

   return (
      <>
         <AgentsListHeader />
         <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentViewLoading />}>
               <ErrorBoundary fallback={<AgentViewError />}>
                  <AgentView />
               </ErrorBoundary>
            </Suspense>
         </HydrationBoundary>
      </>
   )
}

export default Page;