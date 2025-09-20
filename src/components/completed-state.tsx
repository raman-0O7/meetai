import { MeetingGetOne } from "@/modules/meetings/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "./generated-avatar";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { formatDuration } from "@/lib/utils";
import Markdown from "react-markdown";

interface Props {
    data: MeetingGetOne;
}
export const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue="summary">
                <div className="bg-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13">
                            <TabsTrigger
                                value="summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <BookOpenTextIcon />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger
                                value="transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileTextIcon />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger
                                value="recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileVideoIcon />
                                Recording
                            </TabsTrigger>
                            <TabsTrigger
                                value="chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <SparkleIcon />
                                Ask AI
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>

                <TabsContent value="recording">
                    <div className="bg-white border px-4 py-5 rounded-lg">
                        <video
                            src={data.recordingUrl!}
                            controls
                            className="w-full rounded-lg"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="border bg-white rounded-lg">
                        <div className="px-4 py-5 flex flex-col col-span-5 gap-y-5">
                            <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
                            <div className="flex gap-x-2 items-center">
                                <Link href={`/agents/${data.agent.id}`} className="flex gap-x-2 items-center underline underline-offset-4 capitalize">
                                    <GeneratedAvatar
                                        seed={data.agent.name}
                                        variant="botttsNeutral"
                                        classname="size-5"
                                    />
                                    {data.agent.name}
                                </Link>{" "}
                                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <SparklesIcon className="size-4" />
                                <p>General Summary</p>
                            </div>
                            <Badge
                                variant={"outline"}
                                className="flex items-center [&>svg]:size-4 gap-x-2"
                            >
                                <ClockFadingIcon className="text-blue-700"/>
                                {data.duration ? formatDuration(data.duration): "No duration"}
                            </Badge>
                            <div>
                                <Markdown
                                    components={{
                                        h1: (props) => (
                                            <h1 className="text-2xl font-medium mb-6" {...props}/>
                                        ),
                                        h2: (props) => (
                                            <h2 className="text-xl font-medium mb-6" {...props}/>
                                        ),
                                        h3: (props) => (
                                            <h3 className="text-lg font-medium mb-6" {...props}/>
                                        ),
                                        h4: (props) => (
                                            <h4 className="text-base font-medium mb-6" {...props}/>
                                        ),
                                        p: (props) => (
                                            <p {...props} className="mb-6 leading-relaxed" />
                                        ),
                                        ul: (props) => (
                                            <ul {...props} className="list-disc list-inside mb-6" />
                                        ),
                                        ol: (props) => (
                                            <ol {...props} className="mb-6 list-decimal list-inside" />
                                        ),
                                        li: (props) => (
                                            <li {...props} className="mb-1" />
                                        ),
                                        strong: (props) => (
                                            <strong {...props} className="font-semibold" />
                                        ),
                                        code: (props) => (
                                            <code {...props} className="bg-gray-100 px-1 py-0.5 rounded" />
                                        ),
                                    }}
                                >
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}