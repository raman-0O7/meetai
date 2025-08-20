import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingView, MeetingViewError, MeetingViewLoading } from "@/modules/meetings/ui/view/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingViewError />}>
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default Page;