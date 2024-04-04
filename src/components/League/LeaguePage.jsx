import React from "react";
import {useParams} from "react-router";
import FreeAgents from "./FreeAgents";
import LeagueDetails from "./LeagueDetails";
import './LeaguePage.scss'


export default function LeaguePage() {
    const { gameKey, leagueId } = useParams();

    return(
        <div className="leaguePageContainer">
            <LeagueDetails leagueId={leagueId} gameKey={gameKey} />
            <FreeAgents leagueId={leagueId} gameKey={gameKey} />
        </div>
    )
}
