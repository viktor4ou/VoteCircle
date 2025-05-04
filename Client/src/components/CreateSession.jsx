import { useState } from "react";
import { CirclePlus, CalendarDays } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createVotingSession } from "@/utility/FertchVotingSessions";
import { toast } from "sonner";
const CreateSession = ({ getSessions }) => {
    const [open, setOpen] = useState(false); // State to control modal open/close
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [date, setDate] = useState();

    async function onFormSubmit(e) {
        e.preventDefault();
        const scheduledUntil = date.toISOString();

        const obj = { title, description, scheduledUntil };
        const result = await createVotingSession(obj);
        if (!result.ok) {
            toast.error(result.title, {
                description: result.detail,
            });
        } else {
            toast.success(result.message);
        }

        setOpen(false);
        await getSessions();
        setTitle("");
        setdescription("");
        setDate("");
    }

    function titleOnChange(e) {
        setTitle(e.target.value);
    }

    function descriptionOnChange(e) {
        setdescription(e.target.value);
    }
    return (
        <div className="flex items-center justify-center">
            <Button
                variant="outline"
                className="absolute left-1/2 transform -translate-x-1/2 flex mt-1 items-center gap-1 bg-[#01ff95] text-263642  cursor-pointer hover:bg-[#4199FF] hover:text-amber-50 drop-shadow-xl"
                onClick={() => setOpen(true)} // Opens modal on click
            >
                Create Session
                <CirclePlus />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Session</DialogTitle>
                        <DialogDescription>
                            Provide the necessary details to create a new
                            session. Fill out the fields below and click save to
                            finalize the process.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-2">
                        <form onSubmit={(e) => onFormSubmit(e)}>
                            <label className="flex flex-col gap-1 mb-2">
                                <span className="text-sm font-medium">
                                    Title
                                </span>
                                <input
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="New water pipe"
                                    name="title"
                                    value={title}
                                    onChange={titleOnChange}
                                />
                            </label>

                            <label className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                    Description
                                </span>
                                <input
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="We need new water pipe, because our is old!"
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={descriptionOnChange}
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                    Schedule Until
                                </span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                " justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarDays />
                                            {date ? (
                                                format(date, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={{ before: new Date() }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </label>
                            <DialogFooter className="my-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className=" bg-red-400 text-amber-50"
                                    type="button"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=" bg-[#42db7b] text-amber-50"
                                >
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateSession;
