import './Navbar.css'
import { Person, PersonFill } from 'react-bootstrap-icons'
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src='../../public/logo.png'
                        alt="Bootstrap"
                        width={150}
                        height={60}
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <p className='spacer'></p>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Crypto
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Contacts
                            </a>
                        </li>
                        <li className="nav-item last">
                            <a className="nav-link" aria-disabled="true">
                                <PersonFill className='nav-icon'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar