import './Navbar.css'
import { Person, PersonFill, BoxArrowRight } from 'react-bootstrap-icons'
import { AuthContext } from '../auth/AuthContext'
import { useContext } from 'react'


function Navbar() {

    const { isLogged } = useContext(AuthContext)
    const {setIsLogged} = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
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
                            <a className="nav-link active" aria-current="page" href="/crypto">
                                Crypto
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/nft">
                                NFT
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/news">
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contacts">
                                Contacts
                            </a>
                        </li>
                        <li className="nav-item last">

                            {isLogged ? (
                                <a className="nav-link" aria-disabled="true" href=''>
                                    <BoxArrowRight className='nav-icon' onClick={() => {setIsLogged(false)}}/>
                                </a>
                            ) : (
                                    <a className="nav-link" aria-disabled="true" href='/login'>
                                        <PersonFill className='nav-icon' />
                                    </a>     
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar