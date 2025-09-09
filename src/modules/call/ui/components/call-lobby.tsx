
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generatedAvatarUri } from "@/lib/avatar";
import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    VideoPreview,
    useCallStateHooks
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    onJoin: () => void;
}

const DisabledVideoParticipant = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user.name ?? "",
                    image: data?.user.image ??
                        generatedAvatarUri({
                            seed: data?.user.name ?? "",
                            variant: "initials"
                        })
                } as StreamVideoParticipant
            }
        />
    )
}

const AllowBrowserPermission = () => {
    return (
        <p className="text-sm">
            Please grant your browser a permission to access camera and microphone.
        </p>
    )
}

export const CallLobby = ({ onJoin }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();
    const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();

    const hasBrowserMediaPermission = hasCameraPermission && hasMicrophonePermission;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
            <div className="flex-1 py-4 px-8 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="font-medium text-lg">Ready to join?</h6>
                        <p className="text-sm">Set up your call before joining?</p>
                    </div>
                    <VideoPreview 
                        DisabledVideoPreview={
                            hasBrowserMediaPermission ? DisabledVideoParticipant: AllowBrowserPermission
                        }
                    />
                    <div className="flex gap-x-2">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                    </div>
                    <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant={"ghost"}>
                            <Link href={"/meetings"}>
                                Cancel
                            </Link>
                        </Button>
                        <Button onClick={onJoin}>
                            <LogInIcon />
                            Join Call
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

