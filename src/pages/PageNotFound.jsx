import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            <h2>Error 404</h2>

            <p>This page it's not found. <Link to={`/`}> You can go back to the homepage.</Link></p>
        </div>
    )
}

export default PageNotFound