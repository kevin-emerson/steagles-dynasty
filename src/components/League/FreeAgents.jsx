import {useAuth} from "../../AuthContext";
import React, {useEffect, useState} from "react";
import {getFreeAgents} from "../../apis/FantasyApi";
import './FreeAgents.scss'
import './Players/PlayerTable.scss'
import {downloadCsv} from "../../utility/csvHelper";
import PlayerTable from "./Players/PlayerTable";

export default function FreeAgents({leagueId, gameKey}) {
    const { authToken } = useAuth();
    const [freeAgents, setFreeAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getFreeAgents(authToken, leagueId, gameKey).then(data => {
            setFreeAgents(data)
            setIsLoading(false)
        })
    }, [])

    // TODO add to table and make searchable/paginate
    // const renderFreeAgents = () => {
    //     let freeAgentsHtml = []
    //     freeAgents.slice(0,5).forEach(player => {
    //         freeAgentsHtml.push(
    //             <div className="playerContainer" key={`player:${player?.player_id}`}>
    //                 <img key={`image:${player?.player_image}`} src={player?.player_image} />
    //                 <p key={`name:${player?.primary_position}`}>{player?.primary_position}</p>
    //                 <p key={`name:${player?.full}`}>{player?.full}</p>
    //                 <p key={`team:${player?.team}`}>{player?.team}</p>
    //             </div>
    //         )
    //     })
    //     return freeAgentsHtml;
    // }

    const BaseProductTblImageComponent = (props) => {
        return (
            <td
                style={{
                    width: "170px",
                    minWidth: "170px",
                    backgroundColor: "#fff",
                }}
            >
                <img src={props.rowData.player_image} />
            </td>
        );
    };

    let col = [
        "player_image",
        "primary_position",
        "full",
        "team",
        "delete",
        "edit",
    ];
    let tHead = [
        "Image",
        "Position",
        "Name",
        "Team",
        "Delete",
        "Edit",
    ];

    return(
        <div className="freeAgentsContainer">
            { isLoading ? <p>Loading Free Agents...</p> :
                <div>
                    <div className="freeAgentsHeader">
                        <p>FREE AGENTS</p>
                        <div className="downloadFreeAgentsButton" onClick={() => downloadCsv(freeAgents, `${leagueId}_Free_Agents`)}> Download Free Agents</div>
                    </div>
                    {/*{renderFreeAgents()}*/}
                    <PlayerTable
                        tblData={freeAgents}
                        tHead={tHead}
                        customTd={[
                            { custd: BaseProductTblImageComponent, keyItem: "player_image" },
                        ]}
                        dKey={col}
                    />
                </div>
            }
        </div>
    )
}
