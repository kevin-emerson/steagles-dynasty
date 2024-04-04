import {useAuth} from "../../AuthContext";
import React, {useEffect, useState} from "react";
import {getFreeAgents} from "../../apis/YahooApi";
import './FreeAgents.scss'
import {downloadCsv} from "../../utility/csvHelper";

export default function FreeAgents({leagueId, gameKey}) {
    const { authToken } = useAuth();
    const [freeAgents, setFreeAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getFreeAgents(authToken, leagueId, gameKey).then(res => {
            res.json().then(data => {
                setFreeAgents(data)
                setIsLoading(false)
            })
        })
    }, [])

    // TODO add to table and make searchable/paginate
    const renderFreeAgents = () => {
        let freeAgentsHtml = []
        freeAgents.slice(0,5).forEach(player => {
            freeAgentsHtml.push(
                <div className="playerContainer" key={`player:${player?.player_id}`}>
                    <img key={`image:${player?.player_image}`} src={player?.player_image} />
                    <p key={`name:${player?.primary_position}`}>{player?.primary_position}</p>
                    <p key={`name:${player?.full}`}>{player?.full}</p>
                    <p key={`team:${player?.team}`}>{player?.team}</p>
                </div>
            )
        })
        return freeAgentsHtml;
    }

    return(
        <div className="freeAgentsContainer">
            { isLoading ? <p>Loading Free Agents...</p> :
                <div>
                    <div className="freeAgentsHeader">
                        <p>FREE AGENTS</p>
                        <div className="downloadFreeAgentsButton" onClick={() => downloadCsv(freeAgents, `${leagueId}_Free_Agents`)}> Download Free Agents</div>
                    </div>
                    {renderFreeAgents()}
                </div>
            }
        </div>
    )
}
