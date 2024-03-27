import React, {useEffect, useState} from "react";
import {useAuth} from "../AuthContext";
import {getTeams} from "../apis/YahooApi";
import {useNavigate} from "react-router-dom";

export default function UserDetails() {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState([]);

    useEffect( () => {
        getTeams(authToken).then(res => {
            res.json().then(data => {
                setTeamData(data)
            })
        })
    }, [])

    const renderTeamData = () => {
        let teamsHtml = []
        teamData.forEach(team => {
            teamsHtml.push(
                <div key={`team:${team.leagueId}`} onClick={() => navigate('/league-details')}>
                    <p key={`league:${team.leagueId}`}>League Id: {team.leagueId}</p>
                    <p key={`name:${team.leagueId}`}>Team Name: {team.name}</p>
                    <img key={`image:${team.leagueId}`} src={team.imageUrl} />
                </div>
            )
        })
        return teamsHtml;
    }

    return(
        <div>
            <p>TEAMS</p>
            {renderTeamData()}
        </div>
    )
}
