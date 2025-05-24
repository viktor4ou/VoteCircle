import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { editEntity } from "../utility/FetchEntities";
export const EditEntity = ({
    oldTitle,
    oldPercentageWeight,
    id,
    fetchData,
}) => {
    const [title, setTitle] = useState(oldTitle);
    const [percentageWeight, setPercentageWeight] =
        useState(oldPercentageWeight);
    const [open, setOpen] = useState(false); // State to control modal open/close

    async function onFormSubmit(e) {
        e.preventDefault();
        const obj = { id, title, percentageWeight };
        const response = await editEntity(obj);
        if (response.isSuccessful) {
            toast.success(response.message);
            setOpen(false);
        }
        await fetchData();
    }
    function titleOnChange(e) {
        setTitle(e.target.value);
    }

    function percentageWeightOnChange(e) {
        setPercentageWeight(e.target.value);
    }
    return (
        <div className="flex items-center justify-center">
            <Button
                variant="outline"
                onClick={() => setOpen(true)} // Opens modal on click
            >
                <SquarePen />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Entity</DialogTitle>
                        <DialogDescription>
                            Fill out the fields below and click save to finalize
                            the process.
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
                                    placeholder={title}
                                    name="title"
                                    value={title}
                                    onChange={titleOnChange}
                                />
                            </label>

                            <label className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                    Percentage Weight
                                </span>
                                <input
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                    name="percentageWeight"
                                    placeholder={percentageWeight}
                                    value={percentageWeight}
                                    onChange={percentageWeightOnChange}
                                />
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
                                    Edit
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
