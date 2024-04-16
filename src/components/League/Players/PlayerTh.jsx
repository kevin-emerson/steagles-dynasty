const PlayerTh = (props) => {
    const { sortData, dataKey, asc, children } = props;
    function sort() {
        sortData(dataKey, !asc);
    }
    let sortCssClass = "fas fa-sort";
    switch (asc) {
        case null:
            sortCssClass = "fas fa-sort";
            break;
        case true:
            sortCssClass = "fas fa-sort-amount-up";
            break;
        case false:
            sortCssClass = "fas fa-sort-amount-down";
            break;
    }
    return (
        <div
            onClick={sort}
            // count={dataKey.length}
        >
            {children}
            <br />
            <i className={sortCssClass} />
        </div>
    );
};

export default PlayerTh;
