import Entity from "./Entity";
import { useEffect, useState } from "react";
import { VoteProgress } from "@/components/ui/VoteProgress";
import CreateEntity from "./CreateEntity";
import { getAllEntitesBySessionId } from "./../utility/FetchEntities";
import { useParams } from "react-router";
const ActivePoll = () => {
    const [entities, setEntities] = useState([]);
    const [voteResult, setVoteResult] = useState(0.0);
    const { id } = useParams();
    async function fetchData() {
        setEntities(await getAllEntitesBySessionId(id));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-background flex flex-col px-4 py-6 sm:px-8 lg:px-32 space-y-6">
            <div className="grid grid-cols-3 items-center mb-4">
                <h1 className="col-start-1 text-left font-bold text-xl sm:text-4xl text-[#42db7b]">
                    Presence
                </h1>
                <div className="col-start-2 flex justify-center">
                    <CreateEntity
                        fetchData={fetchData}
                        sessionId={id}
                        className="w-full max-w-xs md:w-auto"
                    />
                </div>
                <h1 className="col-start-3 text-right font-bold text-2xl sm:text-4xl text-foreground">
                    Vote
                </h1>
            </div>

            <div className="w-full">
                <VoteProgress value={Math.abs(voteResult)} />
            </div>

            <div className="h-[600px] overflow-y-auto space-y-4">
                {entities.map((entity) => (
                    <Entity
                        key={entity.id}
                        {...entity}
                        fetchData={fetchData}
                        setVoteResult={setVoteResult}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivePoll;
