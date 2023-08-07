import React, { Component } from 'react'
import './sass/process.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEnvelope, faToolbox, faList, faMicrochip, faMobileScreenButton, faMagnifyingGlass, faPowerOff, faCirclePause, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
export class Process extends Component {
    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="sidebar">
                                <div className="sidebar-user">
                                    <div className="sidebar-user-symbol">
                                        <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff", fontSize: "5rem" }} />
                                    </div>
                                    <div className="sidebar-user-text">Xin chào người dùng</div>
                                </div>
                                <div className="sidebar-selections">
                                    <div className="selection" id="mailbox">
                                        <div className="selection-symbol">
                                            <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff", fontSize: "2rem" }} />
                                        </div>
                                        <div className="selection-text">Hộp thư</div>
                                    </div>
                                    <div className="selection" id="config">
                                        <div className="selection-symbol">
                                            <i
                                                className="fa-solid fa-toolbox"
                                                style={{ color: "#ffffff" }}
                                            />
                                            <FontAwesomeIcon icon={faToolbox} style={{ color: "#ffffff", fontSize: "2rem" }} />
                                        </div>
                                        <div className="selection-text">Cấu hình</div>
                                    </div>
                                    <div className="selection" id="simlist">
                                        <div className="selection-symbol">
                                            <i className="fa-solid fa-list" style={{ color: "#ffffff" }} />
                                            <FontAwesomeIcon icon={faList} style={{ color: "#ffffff", fontSize: "2rem" }} />
                                        </div>
                                        <div className="selection-text">Danh sách sim</div>
                                    </div>
                                    <div className="selection" id="process">
                                        <div className="selection-symbol">
                                            <i
                                                className="fa-solid fa-microchip"
                                                style={{ color: "#ffffff" }}
                                            />
                                            <FontAwesomeIcon icon={faMicrochip} style={{ color: "#ffffff", fontSize: "2rem" }} />
                                        </div>
                                        <div className="selection-text">Tiến trình</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="header">
                                <div className="header-symbol">
                                    <FontAwesomeIcon icon={faMicrochip} style={{ color: "#ffffff", fontSize: "2rem", padding: "10px" }} />
                                </div>
                                <div className="header-text">Tiến trình</div>
                            </div>
                            <main>
                                <div className="row mt-3 btns-container ">
                                    <div className="col-md-4 text-center btn-container ">
                                        <button className="btn-container-green">
                                            <FontAwesomeIcon icon={faPowerOff} 
                                            style={{
                                                fontSize: "2rem",
                                                color: "#24c79f"
                                            }} />
                                        </button>
                                    </div>
                                    <div className="col-md-4 text-center btn-container">
                                        <button className="btn-container-yellow">
                                            <FontAwesomeIcon icon={faCirclePause}
                                                style={{
                                                    fontSize: "2rem",
                                                    color: "#d0dc45"
                                                }} />
                                        </button>
                                    </div>
                                    <div className="col-md-4 text-center btn-container">
                                        <button className="btn-container-red">
                                            <FontAwesomeIcon icon={faCircleMinus}
                                                style={{
                                                    fontSize: "2rem",
                                                    color: "#cc3f3f"
                                                }} />
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-3 mb-3 progress-container">
                                    <div className="text-white " style={{ fontSize: "1.2rem" }}>
                                        Tiến độ thực hiện
                                    </div>
                                    <div className="progress mt-2" style={{ padding: 0 }}>
                                        <div
                                            className="progress-bar"
                                            style={{ width: "75%" }}
                                            role="progressbar"
                                            aria-valuenow={22}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                        <div className="progress-text">
                                            <span>15</span> / <span>20</span>
                                        </div>
                                    </div>
                                </div>
                                <table className="mt-4 table">
                                    <thead className="text-center">
                                        <tr>
                                            <th>STT</th>
                                            <th>Sim duyệt</th>
                                            <th>Trạng thái</th>
                                            <th>Thông báo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>1</td>
                                            <td>098756555</td>
                                            <td>Thành công</td>
                                            <td>Quan trọng</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div class="row">
                                    <nav aria-label="...">
                                        <ul class="pagination" style="justify-content: center;">
                                            <li class="page-item">
                                                <a class="page-link br-color text-white" href="#">Trước</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link br-color text-white" href="#">1</a>
                                            </li>
                                            <li class="page-item active" aria-current="page">
                                                <a class="page-link br-color text-white" href="#">2</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link br-color text-white" href="#">3</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link br-color text-white" href="#">Sau</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div> */}
                            </main>

                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default Process