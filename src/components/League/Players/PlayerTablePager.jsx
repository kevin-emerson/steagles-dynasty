import PlayerTableDropdown from "./PlayerTableDropdown";
import React from "react";
import './PlayerTable.scss'

const PlayerTablePager = (props) => {
    const {
        setCurrentPage,
        setRowsPerPage,
        curr,
        totalPage,
        rowPerPage,
    } = props;

    function addPage() {
        if (curr >= props.totalPage - 1) return;

        setCurrentPage(curr + 1);
    }
    function subPage() {
        if (curr < 1) return;

        setCurrentPage(curr - 1);
    }
    function setCurrentRowsPerPage(i) {
        if (i === "All" || isNaN(i)) i = props.totalsCount;
        setRowsPerPage(i);
    }

    let nextDisableStyle = curr + 1 >= totalPage;
    let prevDisableStyle = curr + 1 <= 1;
    let rowPerPageText = totalPage === 1 ? "All" : rowPerPage;

    const pageOptions = Array.from(Array(totalPage).keys()).map((item) => ({
        value: item,
        text: item + 1,
    }));
    const perPageOptions = [5, 10, 20, 50, "All"].map((item) => ({
        value: item,
        text: item,
    }));
    return (
        <div className="pager">
            <div className="pagerButtons">
                <button
                    type="button"
                    name=""
                    disabled={prevDisableStyle}
                    onClick={subPage}
                >
                    Prev
                </button>
                <PlayerTableDropdown
                    selected={curr + 1}
                    options={pageOptions}
                    callback={setCurrentPage}
                />
                <button
                    type="button"
                    name=""
                    disabled={nextDisableStyle}
                    onClick={addPage}
                >
                    Next
                </button>
                <div>display</div>
                <PlayerTableDropdown
                    selected={rowPerPageText}
                    options={perPageOptions}
                    callback={setCurrentRowsPerPage}
                />
                <div>rows per page</div>
            </div>
            <div className="pagerCounts">
                Page {curr + 1} of total {props.totalPage}, total{" "}
                {props.totalsCount} rows
            </div>
        </div>
    );
};

export default PlayerTablePager;
