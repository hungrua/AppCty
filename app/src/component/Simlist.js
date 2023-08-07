import React, { Component } from 'react'
import './sass/simlist.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleUser, faEnvelope, faToolbox, faList, faMicrochip, faSimCard, faPlus,
    faMobileScreenButton, faFileExcel, faPenToSquare, faTrashCan, faCircleXmark, faNoteSticky, faFloppyDisk
} from '@fortawesome/free-solid-svg-icons'
export class Simlist extends Component {
    constructor(){
        super();
        this.state = {
            variables: {
                checkbox: true
            }
        }
    }
    showAddWindow = () => {
        document.querySelector('.sub-container').style.display = 'block';
    }
    hideAddWindow = () => {
        document.querySelector('.sub-container').style.display = 'none';
    }
    tickAllCheckbox = () => {
        const tmp = {...this.state}
        document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
            checkbox.checked = tmp.variables.checkbox;
        })
        this.setState(prevState=>({
            variables :{
                checkbox: prevState.variables.checkbox==true?false:true
            }
        }))
    }
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
                                    <FontAwesomeIcon icon={faList} style={{ color: "#ffffff", fontSize: "2rem", padding: "10px" }} />
                                </div>
                                <div className="header-text">Danh sách sim</div>
                            </div>
                            <main>
                                <div className="searcher d-flex">
                                    <form
                                        action=""
                                        method="post"
                                        className="d-flex justify-content-between"
                                    >
                                        <div className="searcher-inputTel d-flex align-items-center">
                                            <FontAwesomeIcon icon={faMobileScreenButton} style={{
                                                position: "absolute",
                                                left: "18px",
                                                color:"#24c79f" 

                                            }} />
                                            <input
                                                type="text"
                                                name="listName"
                                                id="listName"
                                                placeholder="Nhập tên danh sách...."
                                            />
                                        </div>
                                        <div className="uploadFile">
                                            <label htmlFor="file-upload" className="custom-file-upload">
                                                <FontAwesomeIcon icon={faFileExcel} style={{ color: "#24c79f" }} />
                                                {" "}
                                                Tải file excel tại đây
                                            </label>
                                            <input id="file-upload" type="file" />
                                        </div>
                                        <button>Thêm mới</button>
                                    </form>
                                </div>
                                <table className="mt-4 table">
                                    <thead className="text-center">
                                        <tr>
                                            <th>
                                                <button onClick={this.tickAllCheckbox}>
                                                    Tất cả
                                                </button>
                                            </th>
                                            <th>STT</th>
                                            <th>Tên danh sách</th>
                                            <th>Số lượng sim</th>
                                            <th>Ghi chú</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>
                                                <input type="checkbox" name="" id="list-1" />
                                            </td>
                                            <td>1</td>
                                            <td>Danh sách 1</td>
                                            <td>10</td>
                                            <td>Quan trọng</td>
                                            <td>
                                                <button className="action-btn edit-btn" id="edit-1" onClick={this.showAddWindow}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#24c79f" }} />
                                                </button>
                                                <button className="action-btn remove-btn" id="remove-1">
                                                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#cc3f3f" }} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" name="" id="list-1" />
                                            </td>
                                            <td>1</td>
                                            <td>Danh sách 1</td>
                                            <td>10</td>
                                            <td>Quan trọng</td>
                                            <td>
                                                <button className="action-btn edit-btn" id="edit-1" onClick={this.showAddWindow}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#24c79f" }} />
                                                </button>
                                                <button className="action-btn remove-btn" id="remove-1">
                                                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#cc3f3f" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </main>
                        </div>
                    </div>
                </div>
                <div className="sub-container" style={{ display: "none" }}>
                    <div className="editCard">
                        <div className="editCard-delete">
                            <button onClick={this.hideAddWindow}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#cc3f3f" }} />
                            </button>
                        </div>
                        <div className="editCard-name">
                            <input type="hidden" name="id" />
                            <label htmlFor="listName">
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff" }} />{" "}
                                Tên danh sách
                            </label>
                            <br />
                            <input
                                type="text"
                                name="listName"
                                defaultValue=""
                                placeholder="Điền tên danh sách...."
                            />
                        </div>
                        <div className="editCard-list">
                            <label htmlFor="listNumber">
                                <FontAwesomeIcon icon={faSimCard} style={{ color: "#ffffff" }} />{" "}
                                Danh sách sim
                            </label>
                            <div className="editCard-list-searchOrAdd">
                                <input
                                    type="text"
                                    name="listNumber"
                                    defaultValue=""
                                    placeholder="Lọc hoặc thêm mới sim tại đây...."
                                />
                                <button>
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} /> Thêm
                                </button>
                            </div>
                            <div className="editCard-list-table">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Sim</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <input type="tel" name="" id="" />
                                            </td>
                                            <td>
                                                <button className="action-btn remove-btn" id="remove-1">
                                                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#cc3f3f" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="editCard-note">
                            <label htmlFor="note">
                                <i
                                    className="fa-regular fa-note-sticky"
                                    style={{ color: "#ffffff" }}
                                />
                                <FontAwesomeIcon icon={faNoteSticky} style={{ color: "#ffffff" }} /> Thêm
                                Ghi chú
                            </label>
                            <br />
                            <textarea name="note" id="" rows={10} defaultValue={""} />
                        </div>
                        <div className="editCard-save">
                            <button>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#ffffff" }} />{" "}
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Simlist