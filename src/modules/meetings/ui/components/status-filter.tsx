import { CircleCheckIcon, CircleXIcon, ClockArrowUp, LoaderIcon, VideoIcon } from "lucide-react";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hook/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";


const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className="flex gap-x-2 items-center capitalize">
                <ClockArrowUp />
                {MeetingStatus.Upcoming}
            </div>
        )
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex gap-x-2 items-center capitalize">
                <CircleCheckIcon />
                {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex gap-x-2 items-center capitalize">
                <VideoIcon />
                {MeetingStatus.Active}
            </div>
        )
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex gap-x-2 items-center capitalize">
                <LoaderIcon />
                {MeetingStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex gap-x-2 items-center capitalize">
                <CircleXIcon />
                {MeetingStatus.Cancelled}
            </div>
        )
    },
]

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <CommandSelect
            placeholder="Status"
            className="h-9"
            options={options}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            value={filters.status ?? ""}
        />
    )
}