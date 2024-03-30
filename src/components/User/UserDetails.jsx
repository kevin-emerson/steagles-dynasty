import React, {useEffect, useState} from "react";
import {useAuth} from "../../AuthContext";
import {getUsersTeams} from "../../apis/YahooApi";
import {useNavigate} from "react-router-dom";
import './UserDetails.scss'

export default function UserDetails() {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState([]);

    useEffect( () => {
        getUsersTeams(authToken).then(res => {
            res.json().then(data => {
                setTeamData(data)
            })
        })
    }, [])

    const renderTeamData = () => {
        let teamsHtml = []
        teamData.forEach(team => {
            teamsHtml.push(
                <div className="teamContainer" key={`team:${team?.leagueId}`} onClick={() => navigate(`/league-details/${team?.leagueId}`)}>
                    <p key={`name:${team?.leagueId}`}>Team: {team?.name}</p>
                    <img key={`image:${team?.leagueId}`} src={team?.imageUrl} />
                </div>
            )
        })
        return teamsHtml;
    }

    return(
        <div className="container">
            <p>TEAMS</p>
            <div className="allTeamsContainer">
                {renderTeamData()}
            </div>
        </div>
    )
}
