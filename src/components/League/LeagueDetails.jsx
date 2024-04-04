import {useAuth} from "../../AuthContext";
import React, {useEffect, useState} from "react";
import {getLeagueData, getLeagueTeams} from "../../apis/YahooApi";
import './LeagueDetails.scss'
import {downloadCsvAllRosters} from "../../utility/csvHelper";

export default function LeagueDetails({leagueId, gameKey}) {
    const { authToken } = useAuth();
    const [leagueData, setLeagueData] = useState(null);
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getLeagueData(authToken, leagueId, gameKey).then(res => {
            res.json().then(leagueData => {
                getLeagueTeams(authToken, leagueId, gameKey, leagueData.numTeams).then(res => {
                    res.json().then(data => {
                        setLeagueData(leagueData)
                        setTeamData(data)
                        setIsLoading(false)
                    })
                })
            })
        })
    }, [])

    const renderLeagueDetails = () => {
        return (
            <div className="leagueContainer">
                <p>{leagueData?.name}</p>
                <img src={leagueData?.logo} />
            </div>
        )
    }

    const renderTeamDetails = () => {
        const teamsHtml = [];

        teamData.forEach(team => {
            teamsHtml.push(
                <div className="leagueTeamContainer" key={`team${team.teamId}`}>
                    <img src={team.teamLogo} className="teamLogo" />
                    <p>{team.teamName}</p>
                </div>
            )
        })
        return teamsHtml;
    }

    return(
        <div className="leagueDetailsContainer">
            {isLoading ? <p>Loading League Details...</p> :
                <>
                    {renderLeagueDetails()}
                    <div>
                        <div className="leagueTeamsHeader">
                            <p>TEAMS</p>
                            <div className="downloadTeamsButton" onClick={() => {
                                downloadCsvAllRosters(teamData, `${leagueData.name}_Rosters`)
                            }}>Download Rosters</div>
                        </div>
                        {renderTeamDetails()}
                    </div>
                </>
            }
        </div>
    )
}
