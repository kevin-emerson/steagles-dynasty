export function jsonToCsv(jsonData) {
    let csv = '';
    let headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    jsonData.forEach(function (row) {
        let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
        csv += data + '\n';
    });
    return csv;
}

export const downloadCsvFromJson = (data, filename) => {
    let csvData = jsonToCsv(data);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
}

export const downloadProjections = () => {
    fetch("/public/2025_Projections.xlsx").then((response) => {
        response.blob().then((blob) => {
            const fileURL =
                window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "2025_Projections.xlsx";
            alink.click();
        });
    });
}

const flattenRosters = (rosters) => {
    const newArr = [];
    rosters.forEach(team => {
        let tempArr = team.players;
        tempArr.forEach(roster => {
            newArr.push(
                { ...roster, fantasyTeam: team.teamName }
            )
        })
    })

    return newArr;
}

export const downloadCsvAllRosters = (data, filename) => {
    const allRosterData = flattenRosters(data)
    downloadCsvFromJson(allRosterData, filename)
}
