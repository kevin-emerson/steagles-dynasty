import {useOnClickOutside} from "../../../utility/clickEventHelper";
import {useRef, useState} from "react";

const PlayerTableDropdown = (props) => {
    const { options, selected, callback } = props;
    const ref = useRef();
    const [show, setShow] = useState(false);
    useOnClickOutside(ref, () => setShow(false));
    function toggleDropdown(e) {
        setShow(!show);
    }
    function select(e) {
        let i = e.target.getAttribute("data-i");
        setShow(false);
        callback && callback(i);
    }
    return (
        <div>
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}
                >
                    <>{selected}</>
                    {/*<i*/}
                    {/*    className={*/}
                    {/*        show ? "fas fa-caret-up" : "fas fa-caret-down"*/}
                    {/*    }*/}
                    {/*/>*/}
                </button>
                {show && (
                    <ul ref={ref}>
                        {options.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    data-i={item.value}
                                    onClick={select}
                                >
                                    {item.text}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default PlayerTableDropdown;
