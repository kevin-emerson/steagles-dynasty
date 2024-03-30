import React from "react";
import {useParams} from "react-router";
import FreeAgents from "./FreeAgents";
import LeagueDetails from "./LeagueDetails";


export default function LeaguePage() {
    const { leagueId } = useParams();

    return(
        <div>
            <LeagueDetails leagueId={leagueId} />
            <FreeAgents leagueId={leagueId} />
        </div>
    )
}
