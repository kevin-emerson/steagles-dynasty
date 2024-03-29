import {useAuth} from "../../AuthContext";
import React, {useEffect, useState} from "react";
import {getFreeAgents} from "../../apis/YahooApi";
import {useParams} from "react-router";


// TODO EXTRACT STYLING -> NO INLINE
export default function FreeAgents() {
    const { authToken } = useAuth();
    const { leagueId } = useParams();
    const [freeAgents, setFreeAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        getFreeAgents(authToken, leagueId).then(res => {
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
                <div key={`player:${player.player_id}`}
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <p key={`name:${player.primary_position}`}>{player.primary_position}</p>
                    <p key={`name:${player.full}`}>{player.full}</p>
                    <p key={`team:${player.team}`}>{player.team}</p>
                    <img key={`image:${player.player_image}`} src={player.player_image} />
                </div>
            )
        })
        return freeAgentsHtml;
    }

    // TODO clean up and style
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

    // TODO clean up and style
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
        <div style={{textAlign: 'center', maxWidth: '50rem', margin: 'auto'}}>
            { isLoading ? <p>Loading...</p> :
                <div>
                    <p>FREE AGENTS</p>
                    {renderFreeAgents()}
                    <div style={{display: 'flex', justifyContent: 'center', padding: '1rem', margin: '1rem 0px'}}>
                        <div style={{textAlign: 'center', border: 'solid', width: '20rem'}} onClick={downloadCsv}> Download all free agents</div>
                    </div>
                </div>
            }
        </div>
    )
}
