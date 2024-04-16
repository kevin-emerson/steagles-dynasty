import React, {useEffect, useState} from "react";
import PlayerTablePager from "./PlayerTablePager";
import PlayerTh from "./PlayerTh";
import PlayerTd from "./PlayerTd";
import './PlayerTable.scss'

const PlayerTable = (props) => {
    const {
        tblData,
        paging,
        tHead,
        customTd,
        dKey,
        defaultRowsPerPage,
        search,
    } = props;
    const [filterString, setFilterString] = useState("");
    const [data, setData] = useState(tblData || []);
    const [pagers, setPager] = useState({
        paging: paging,
        curr: 0,
        rowsPerPage: defaultRowsPerPage,
    });
    const defaultAsc = (dKey || []).reduce((acc, cur) => {
        return Object.assign({}, acc, { [cur]: null });
    }, {});
    const [asc, setAsc] = useState(defaultAsc);

    useEffect(() => {
        setData(tblData);
        // console.log('props ue: ' + JSON.stringify(props))
    }, [tblData]);

    function applyFilter(e) {
        let newData = tblData.filter((item) => {
            for (let key in item) {
                let v = item[key] && item[key].toString().toLowerCase();
                if (v && v.indexOf(e.target.value.toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        });

        setFilterString(e.target.value);
        setData(newData);
    }
    function sortData(dKey, nAsc) {
        let newAsc = asc;
        let newData = data;
        newData.sort((a, b) => {
            if (a[dKey] === b[dKey]) return 0;
            if (nAsc ? a[dKey] > b[dKey] : a[dKey] < b[dKey]) return 1;
            if (nAsc ? a[dKey] < b[dKey] : a[dKey] > b[dKey]) return -1;
            return 0;
        });
        for (let prop in newAsc) {
            newAsc[prop] = null;
        }

        setAsc(Object.assign({}, newAsc, { [dKey]: nAsc }));
        setData(newData);
    }
    function setCurrentPage(i) {
        let index = parseInt(i);
        setPager(Object.assign({}, pagers, { curr: index }));
    }
    function setRowsPerPage(i) {
        let index = parseInt(i);
        let nCurr = pagers.curr;
        let pagesCount = Math.ceil(data.length / index);
        if (pagers.curr >= pagesCount) nCurr = pagesCount - 1;
        setPager(
            Object.assign({}, pagers, {
                rowsPerPage: index,
                curr: nCurr,
            })
        );
    }

    let pagesCount = Math.ceil(data.length / pagers.rowsPerPage);
    let pageData = data.slice();
    if (pagers.paging) {
        pageData = pageData.slice(
            pagers.curr * pagers.rowsPerPage,
            (pagers.curr + 1) * pagers.rowsPerPage
        );
    }
    const empty = !pageData || !pageData.length;
    return (
        <div>
            <div>
                {search && (
                    <div>
                        Search:{" "}
                        <input
                            type="text"
                            name=""
                            value={filterString}
                            placeholder="Filter Result"
                            onChange={applyFilter}
                        />
                    </div>
                )}

                <table>
                    <thead>
                    <tr>
                        {dKey.map((item, id) => {
                            return (
                                <PlayerTh
                                    key={id}
                                    sortData={sortData}
                                    asc={asc[item]}
                                    dataKey={item}
                                >
                                    {tHead[parseInt(id)]}
                                </PlayerTh>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {pageData.map((item, id) => {
                        return (
                            <PlayerTd
                                key={id}
                                {...props}
                                tdData={item}
                                dKey={dKey}
                                customTd={customTd}
                            />
                        );
                    })}
                    {empty && (
                        <tr>
                            <td colSpan={dKey.length}>
                                <div>No Data</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {!empty &&
                (pagers.paging ? (
                    <PlayerTablePager
                        curr={pagers.curr}
                        totalPage={pagesCount}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        totalsCount={data.length}
                        rowPerPage={pagers.rowsPerPage}
                    />
                ) : (
                    ""
                ))}
            </div>
        </div>
    );
};

PlayerTable.defaultProps = {
    tblData: [],
    tHead: [],
    dKey: [],
    customTd: [],
    paging: true,
    search: true,
    defaultRowsPerPage: 10,
};

export default PlayerTable;
