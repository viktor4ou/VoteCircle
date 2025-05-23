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
        <div className="bg-[#FAFAFAFA] flex flex-col ">
            <div className="flex my-5 mx-10 xl:mx-80 sm:mx-20 justify-between drop-shadow-xl">
                <h1 className="font-bold text-4xl text-[#42db7b] drop-shadow-xl">
                    Presence
                </h1>
                <div className="mt-7 max-sm:hidden">
                    <CreateEntity fetchData={fetchData} sessionId={id} />
                </div>
                <h1 className="font-bold text-4xl text-[#263642] drop-shadow-xl">
                    Vote
                </h1>
            </div>

            <div className="mx-10 xl:mx-80 sm:mx-20 my-5">
                <VoteProgress value={Math.abs(voteResult)} />
            </div>

            <div className="mx-10 xl:mx-80 sm:mx-20 h-[600px] overflow-y-auto">
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
