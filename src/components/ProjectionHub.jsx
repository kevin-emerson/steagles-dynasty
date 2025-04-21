import {downloadProjections} from "../utility/csvHelper";

export default function ProjectionHub() {
    return (
        <div style={{marginBottom: '10em'}}>
            <p>Check out the official Steagles Dynasty League Projections for the upcoming season below!</p>
            <button onClick={() => {downloadProjections()}}>Download</button>
        </div>
    )
}
