import React, { useState, useRef } from "react";
import { CirclePlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createEntity } from "@/utility/FetchEntities";
import { toast } from "sonner";
const CreateEntity = ({ fetchData, sessionId }) => {
    const [open, setOpen] = useState(false); // State to control modal open/close
    const [title, setTitle] = useState("");
    const [percentageWeight, setPercentageWeight] = useState();

    async function onFormSubmit(e) {
        e.preventDefault();
        const obj = { title, percentageWeight, sessionId };
        const result = await createEntity(obj);

        if (!result.ok) {
            toast.error(result.title, {
                description: result.detail,
            });
        } else {
            toast.success(result.message);
        }

        setOpen(false);
        await fetchData();
        setTitle("");
        setPercentageWeight("");
    }

    function titleOnChange(e) {
        setTitle(e.target.value);
    }

    function percentageWeightOnChange(e) {
        setPercentageWeight(parseFloat(e.target.value));
    }
    return (
        <div className="flex items-center justify-center">
            <Button
                variant="outline"
                className="absolute left-1/2 transform -translate-x-1/2 flex mt-1 items-center gap-1 bg-[#01ff95] text-263642  cursor-pointer hover:bg-[#4199FF] hover:text-amber-50 drop-shadow-xl"
                onClick={() => setOpen(true)} // Opens modal on click
            >
                Create Entity
                <CirclePlus />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Entity</DialogTitle>
                        <DialogDescription>
                            Provide the necessary details to create a new
                            entity. Fill out the fields below and click save to
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
                                    placeholder="Apartment 1"
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
                                    placeholder="5"
                                    type="number"
                                    name="percentageWeight"
                                    value={percentageWeight ?? ""}
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

export default CreateEntity;
