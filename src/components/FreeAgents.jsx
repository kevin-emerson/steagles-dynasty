import {useAuth} from "../AuthContext";
import React, {useEffect, useState} from "react";
import {getFreeAgents} from "../apis/YahooApi";

export default function FreeAgents() {
    const { authToken } = useAuth();
    const [freeAgents, setFreeAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getFreeAgents(authToken).then(res => {
            console.log('1')
            res.json().then(data => {
                setFreeAgents(data)
                setIsLoading(false)
            })
        })
    }, [])

    const renderFreeAgents = () => {
        let freeAgentsHtml = []
        console.log('2')
        freeAgents.slice(0,5).forEach(player => {
            freeAgentsHtml.push(
                <p key={`player:${player.name}`}>
                    {player.name}
                    {/*<p key={`league:${team.leagueId}`}>League Id: {team.leagueId}</p>*/}
                    {/*<p key={`name:${team.leagueId}`}>Team Name: {team.name}</p>*/}
                    {/*<img key={`image:${team.leagueId}`} src={team.imageUrl} />*/}
                </p>
            )
        })
        return freeAgentsHtml;
    }

    function jsonToCsv(jsonData) {
        let csv = '';
        // Get the headers
        let headers = Object.keys(jsonData[0]);
        csv += headers.join(',') + '\n';
        // Add the data
        jsonData.forEach(function (row) {
            let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
            csv += data + '\n';
        });
        return csv;
    }

    const downloadCsv = () => {
        let csvData = jsonToCsv(freeAgents); // Add .items.data
        // Create a CSV file and allow the user to download it
        let blob = new Blob([csvData], { type: 'text/csv' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
    }

    return(
        <div>
            { isLoading ? <p>Loading...</p> :
                <>
                    <p>FREE AGENTS</p>
                    {renderFreeAgents()}
                    <div style={{border: 'solid'}} onClick={downloadCsv}> Download all free agents</div>
                </>
            }
        </div>
    )
}
