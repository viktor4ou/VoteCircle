import CreateSession from "../CreateSession";
import { getAllSessions } from "@/utility/FertchVotingSessions";
import { useEffect, useState } from "react";
import { Session } from "../Session";

const MainPage = () => {
    const [sessions, setSessions] = useState([]);
    async function getSessions() {
        setSessions(await getAllSessions());
    }
    useEffect(() => {
        getSessions();
    }, []);

    return (
        <div className="flex flex-col mx-5 sm:mx-10 md:mx-30 lg:mx-40 ">
            <div className="flex my-5 mx-10 xl:mx-80 sm:mx-20 justify-between drop-shadow-xl ">
                <CreateSession getSessions={getSessions}>
                    Create Session
                </CreateSession>
            </div>
            <div className="mt-3 ">
                {sessions.map((s) => (
                    <Session {...s} key={s.id} getSessions={getSessions} />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
