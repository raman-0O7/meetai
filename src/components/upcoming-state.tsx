import { BanIcon, VideoIcon } from "lucide-react"
import { EmptyState } from "./empty-state"
import { Button } from "./ui/button"
import Link from "next/link"

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

export const UpcomingState = ({
    meetingId,
    onCancelMeeting,
    isCancelling
}: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState 
                image="/upcoming.svg"
                title="Not started yet"
                description="Once you start the meeting, the summary will appear here"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                    variant={"secondary"}
                    className="w-full lg:w-auto"
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon />
                    Cancel meeting
                </Button>
                <Button 
                    asChild 
                    className="w-full lg:w-auto"
                    disabled={isCancelling}
                >
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}