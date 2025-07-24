import { Loader2Icon } from "lucide-react";

interface Props {
   title: string;
   description: string;
}
export const LoadingState = ({ title, description }: Props) => {
   return (
      <div className="px-8 py-4 flex flex-1 justify-center items-center">
         <div className="flex flex-col bg-background shadow-sm rounded-lg items-center justify-center gap-y-6 p-10">
            <Loader2Icon className="size-6 animate-spin text-primary"/>
            <div className="flex flex-col gap-y-2 text-center">
               <h6 className="text-lg font-medium">{title}</h6>
               <p className="text-sm">{description}</p>
            </div>
         </div>
      </div>
   )
}