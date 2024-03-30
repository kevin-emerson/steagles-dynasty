import {useAuth} from "../../AuthContext";
import React, {useEffect, useState} from "react";
import {getLeagueData, getLeagueTeams} from "../../apis/YahooApi";
import './LeagueDetails.scss'
import {downloadCsv} from "../../utility/csvHelper";

export default function LeagueDetails({leagueId}) {
    const { authToken } = useAuth();
    const [leagueData, setLeagueData] = useState(null);
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getLeagueData(authToken, leagueId).then(res => {
            res.json().then(leagueData => {
                getLeagueTeams(authToken, leagueId, leagueData.numTeams).then(res => {
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
                    <div className="rosterButtonContainer">
                        <div className="rosterButton" onClick={() => downloadCsv(team.players, `${team.teamName}_Roster`)}>Download Roster</div>
                    </div>
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
                    <div className="teamsContainer">
                        <p>TEAMS</p>
                        {renderTeamDetails()}
                    </div>
                    <div className="rosterButtonContainer">
                        <div className="rosterButton" onClick={() => {
                            for (let i=0; i < teamData.length; i++) {
                                downloadCsv(teamData[i].players, `${teamData[i].teamName}_Roster`)
                            }
                        }}>Download All Rosters</div>
                    </div>
                </>
            }
        </div>
    )
}
