import React, { Component } from 'react'
import './sass/config.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEnvelope, faToolbox, faList, faMicrochip,faUser,faKey,faSimCard } from '@fortawesome/free-solid-svg-icons'
export class Config extends Component {
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
                                    <FontAwesomeIcon icon={faToolbox} style={{ color: "#ffffff", fontSize: "2rem", padding: "10px" }} />
                                </div>
                                <div className="header-text">Cấu hình</div>
                            </div>
                            <main>
                                <form className="form-submit">
                                    <div className="form-group mb-5 mt-3 d-flex ">
                                        <label
                                            htmlFor="Profile-Path"
                                            className="col-form-label back-ground-label br"
                                        >
                                        <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", fontSize: 22 }} />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control back-ground-input border border-dark"
                                            id="Profile-Path"
                                            placeholder="Nhập profile path..."
                                        />
                                    </div>
                                    <div className="form-group mb-5 d-flex ">
                                        <label
                                            htmlFor="Api-2captcha"
                                            className="col-form-label back-ground-label br"
                                        >
                                            <FontAwesomeIcon icon={faKey} style={{ color: "#ffffff", fontSize: 22 }} />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control back-ground-input border border-dark"
                                            id="Api-2captcha"
                                            placeholder="Nhập 2captcha APIkey"
                                        />
                                    </div>
                                    <div className="form-group mb-5 d-flex ">
                                        <label htmlFor="" className="col-form-label back-ground-label br">
                                            <FontAwesomeIcon icon={faSimCard} style={{ color: "#ffffff", fontSize: 22 }} />
                                        </label>
                                        <select
                                            className="form-control back-ground-input border border-dark"
                                            id="select-sim"
                                        >
                                            <option value="null">Chọn danh sách sim</option>
                                            <option value="ID danh sách 1">Danh sách sim 1</option>
                                            <option value="ID danh sách 2">Danh sách sim 2</option>
                                            <option value="ID danh sách 3">Danh sách sim 3</option>
                                            <option value="ID danh sách 4">Danh sách sim 4</option>
                                            <option value="ID danh sách 5">Danh sách sim 5</option>
                                        </select>
                                    </div>
                                    <div className="btn-container">
                                        <button type="submit" className="button-submit br">
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </main>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Config