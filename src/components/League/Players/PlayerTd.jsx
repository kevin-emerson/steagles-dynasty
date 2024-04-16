const PlayerTd = (props) => {
    const { customTd, tdData } = props;
    return (
        <div>
            {props.dKey.map((item, id) => {
                let CustomTdComponent = null;
                CustomTdComponent =
                    customTd &&
                    customTd
                        .filter((i) => {
                            return i.keyItem === item;
                        })
                        .reduce((result, item) => {
                            return item;
                        }, {}).custd;

                if (!customTd) return <td key={id}>{tdData[item]}</td>;

                if (CustomTdComponent) {
                    return (
                        <CustomTdComponent
                            key={id}
                            {...props}
                            tdData={tdData[item]}
                            field={item}
                            rowData={tdData}
                        />
                    );
                }

                return <td key={id}>{tdData[item]}</td>;
            })}
        </div>
    );
};

export default PlayerTd;
