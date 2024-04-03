import React, {useEffect, useState} from "react";
import {useAuth} from "../../AuthContext";
import {getUsersTeams} from "../../apis/YahooApi";
import {useNavigate} from "react-router-dom";
import './UserDetails.scss'

export default function UserDetails() {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [seasonsData, setSeasonsData] = useState([]);

    useEffect( () => {
        getUsersTeams(authToken).then(res => {
            res.json().then(data => {
                setSeasonsData(data)
            })
        })
    }, [])

    const renderTeamData = (teamData) => {
        const teamsHtml = []
        teamData.forEach(team => {
            teamsHtml.push(
                <div className="teamContainer" key={`team:${team?.leagueId}`} onClick={() => navigate(`/league-details/${team?.gameKey}/${team?.leagueId}`)}>
                    <p key={`name:${team?.leagueId}`}>{team?.name}</p>
                    <img className="userTeamLogo" key={`image:${team?.leagueId}`} src={team?.imageUrl} />
                </div>
            )
        })
        return teamsHtml;
    }

    const renderSeasonData = () => {
        const seasonsHtml = [];
        seasonsData.forEach(season => {
            seasonsHtml.push(
                <div className="seasonContainer" key={`season:${season.year}`}>
                    <p>{season.year}</p>
                    <div className="teamsContainer" key={`season:${season?.gameKey}`}>
                        {renderTeamData(season.teams)}
                    </div>
                </div>
            )
        })
        return seasonsHtml;
    }

    return(
        <div className="container">
            <p>TEAMS</p>
            <div className="allTeamsContainer">
                {renderSeasonData()}
            </div>
        </div>
    )
}
