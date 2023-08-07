import React, { Component } from 'react'
import './sass/mailbox.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEnvelope, faToolbox, faList, faMicrochip, faMobileScreenButton,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export class Mailbox extends Component {
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
                                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff", fontSize: "2rem", padding: "10px" }} />
                                </div>
                                <div className="header-text">Hộp thư</div>
                            </div>
                            <main>
                                <div className="searcher d-flex">
                                    <form
                                        action=""
                                        method="post"
                                        className="d-flex justify-content-around"
                                    >
                                        <div className="searcher-inputDate">
                                            <input
                                                type="text"
                                                name="sentDay"
                                                id="sentDay"
                                                placeholder="Chọn ngày gửi"
                                                onfocus="(this.type='date')"
                                                onblur="(this.type='text')"
                                            />
                                        </div>
                                        <div className="searcher-inputDate">
                                            <input
                                                type="text"
                                                name="receiveDay"
                                                id="receiveDay"
                                                placeholder="Chọn ngày nhận"
                                                onfocus="(this.type='date')"
                                                onblur="(this.type='text')"
                                            />
                                        </div>
                                        <div className="searcher-inputTel d-flex align-items-center">
                                            <FontAwesomeIcon icon={faMobileScreenButton} style={{
                                                position: 'absolute',
                                                left: '18px',
                                                color: '#24c79f'
                                            }} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                placeholder="Nhập đầu số cần tìm....."
                                            />
                                        </div>
                                        <div className="searcher-btn">
                                            <button className="btn">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <table className="mt-4 table">
                                    <thead className="text-center">
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian gửi</th>
                                            <th>Thời gian nhận</th>
                                            <th>Đầu số gửi</th>
                                            <th>Đầu số nhận</th>
                                            <th>Nội dung</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>1</td>
                                            <td>21-07-2020 17:30:12</td>
                                            <td>21-07-2020 17:31:12</td>
                                            <td>FB</td>
                                            <td>0911929292</td>
                                            <td>012323 là mã xác nhận tài khoản của quý khách</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Mailbox