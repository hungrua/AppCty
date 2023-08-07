import React, { Component } from 'react'
import './sass/sidebar.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCircleUser, faEnvelope, faToolbox, faList, faMicrochip, faMobileScreenButton, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export class sidebar extends Component {
    constructor(){
        super();
        this.state = {
            variables: {
                currentLink: 'mailbox'
            }
        }
    }
    focusOnLink = (e)=>{
        const tmp = {...this.state.variables}
        var link = document.getElementById(tmp.currentLink)
        link.style.backgroundColor = "#1b2a47"
        const element = e.target.closest('.selection')
        const id = element.id
        element.style.backgroundColor = "#152036"
        this.setState({
            variables: id
        })
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-user">
                    <div className="sidebar-user-symbol">
                        <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff", fontSize: "5rem" }} />
                    </div>
                    <div className="sidebar-user-text">Xin chào người dùng</div>
                </div>
                <div className="sidebar-selections">
                    <Link to='/mailbox' onClick={this.focusOnLink}>
                        <div className="selection" id="mailbox">
                            <div className="selection-symbol">
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff", fontSize: "2rem" }} />
                            </div>
                            <div className="selection-text">Hộp thư</div>
                        </div>
                    </Link>
                    <Link to='/config' onClick={this.focusOnLink}>
                        <div className="selection" id="config">
                            <div className="selection-symbol">
                                <FontAwesomeIcon icon={faToolbox} style={{ color: "#ffffff", fontSize: "2rem" }} />
                            </div>
                            <div className="selection-text">Cấu hình</div>
                        </div>
                    </Link>
                    <Link to='/simlist' onClick={this.focusOnLink}>
                        <div className="selection" id="simlist">
                            <div className="selection-symbol">
                                <FontAwesomeIcon icon={faList} style={{ color: "#ffffff", fontSize: "2rem" }} />
                            </div>
                            <div className="selection-text">Danh sách sim</div>
                        </div>
                    </Link>
                    <Link to='/process' onClick={this.focusOnLink}>
                        <div className="selection" id="process">
                            <div className="selection-symbol">
                                <FontAwesomeIcon icon={faMicrochip} style={{ color: "#ffffff", fontSize: "2rem" }} />
                            </div>
                            <div className="selection-text">Tiến trình</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default sidebar