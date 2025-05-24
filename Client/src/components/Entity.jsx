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
import { Card, CardContent } from "./ui/card";
import { PresenceVoteSwitch } from "./ui/PresenceVoteSwitch";
import { Button } from "./ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteEntity } from "../utility/FetchEntities";
import { EditEntity } from "./EditEntity";
import { toast } from "sonner";

const Entity = ({ title, percentageWeight, id, fetchData, setVoteResult }) => {
    const [presenceToggle, setPresenceToggle] = useState(false);
    const [voteToggle, setVoteToggle] = useState(false);
    const [error, setError] = useState(false);

    const handlePresenceToggle = (checked) => {
        setPresenceToggle(checked);
        if (!checked && voteToggle) {
            setVoteToggle(false);
            setVoteResult((prev) => prev - percentageWeight);
        }
    };

    const handleVoteToggle = (checked) => {
        if (checked) {
            setVoteResult((prev) => prev + percentageWeight);
        } else if (!checked) {
            setVoteResult((prev) => prev - percentageWeight);
        }
        setVoteToggle(checked);
    };

    async function deleteOnClick() {
        const response = await deleteEntity(id);

        if (response.isSuccessful) {
            toast.success(response.message);
            await fetchData();
        }
    }

    return (
        <Card>
            <CardContent>
                {/* Overall container with group for hover effects */}
                <div className="flex items-center justify-between group">
                    {/* Left column: First switch */}
                    <div className="mr-4">
                        <PresenceVoteSwitch
                            status={presenceToggle}
                            onCheckedChange={handlePresenceToggle}
                            className="drop-shadow-xl"
                        />
                    </div>

                    {/* Center column: Text (always centered) with icons positioned to its right on hover */}
                    <div className="flex-grow flex justify-center">
                        <div className="relative inline-flex items-center">
                            {/* Text container */}
                            <div className="text-center">
                                <div className="text-xl font-bold">{title}</div>
                                <div>{percentageWeight.toFixed(2)}%</div>
                            </div>
                            {/* Icons container - absolutely positioned to the right of the text container */}
                            <div className="absolute left-full top-0 hidden group-hover:flex items-center space-x-1">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="ml-3"
                                        >
                                            <Trash2 className="mb-1" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure you want to delete
                                                this session?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                session and remove all entities
                                                !
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="bg-red-400 text-white">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={deleteOnClick}
                                                className="bg-green-500"
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <EditEntity
                                    id={id}
                                    oldPercentageWeight={percentageWeight}
                                    oldTitle={title}
                                    fetchData={fetchData}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right column: Second switch */}
                    <div>
                        {presenceToggle ? (
                            <PresenceVoteSwitch
                                status={voteToggle}
                                onCheckedChange={handleVoteToggle}
                            />
                        ) : (
                            <PresenceVoteSwitch status={false} disabled />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Entity;
