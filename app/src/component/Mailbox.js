import React, { Component } from 'react'
import './sass/mailbox.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEnvelope, faToolbox, faList, faMicrochip, faMobileScreenButton, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export class Mailbox extends Component {

    constructor(){
        super();
    }
    changeToDateInput =(e)=>{
        e.target.type="date"
    }
    changeToTextInput =(e)=>{
        e.target.type="text"
    }
    render() {
        return (
            <div className="mailBox-container">
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
                                    onFocus={this.changeToDateInput}
                                    onBlur={this.changeToTextInput}
                                />
                            </div>
                            <div className="searcher-inputDate">
                                <input
                                    type="text"
                                    name="receiveDay"
                                    id="receiveDay"
                                    placeholder="Chọn ngày nhận"
                                    onFocus={this.changeToDateInput}
                                    onBlur={this.changeToTextInput}
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
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
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
        )
    }
}

export default Mailbox