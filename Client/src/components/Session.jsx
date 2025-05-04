import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "./ui/progress";
import { Link } from "react-router";
import { useCountdown } from "@/CustomHooks/useCoutdown";
import { Trash } from "lucide-react";
import { deleteVotingSession } from "@/utility/FertchVotingSessions";
import { toast } from "sonner";
export const Session = ({
    id,
    title,
    description,
    result,
    scheduledUntil,
    getSessions,
}) => {
    const countdown = useCountdown(scheduledUntil);

    async function deleteSessionOnClick() {
        const result = await deleteVotingSession(id);
        if (!result.ok) {
            toast.error(result.title, {
                description: result.detail,
            });
        } else {
            toast.success(result.message);
        }
        getSessions();
    }

    return (
        <Card className="group">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle className="truncate">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <div className="hidden group-hover:flex ">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">
                                <Trash />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to delete this
                                    session?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the session and remove
                                    all entities !
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-400 text-white">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={deleteSessionOnClick}
                                    className="bg-green-500"
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
            <CardContent>
                <Progress value={result} />
                <div className="flex items-center justify-between text-xs">
                    <span>Yes</span>
                    <span>No</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <CardTitle className="truncate text-sm font-normal text-gray-600">
                    <span>{countdown}</span>
                </CardTitle>
                <Link to={`/session/${id}`}>
                    <Button className="self-end">Vote</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
