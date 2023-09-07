import { Link } from 'react-router-dom';

function Error() {
    return (
        <div>
            <h2>Error</h2>

            <p>This page it's not running fine. <Link to={`/`}> You can go back to the homepage.</Link></p>
        </div>
    )
}

export default Error