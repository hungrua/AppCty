import React, { Component } from 'react'
import './sass/subcontainer.scss'
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faList, faSimCard, faPlus,
    faMobileScreenButton, faFileExcel, faPenToSquare, faTrashCan, faCircleXmark, faNoteSticky, faFloppyDisk
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export class Subcontainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openWindowObject: {
                id: '',
                name: '',
                listPhoneNumber: [],
                note: ''
            }
        }
        this.listName = "";
    }
    hideAddWindow = () => {
        this.props.hideSubcontainer();
        this.props.reload()
    }
    removePhoneNumberOnAList = (id) => {
        let config = {
            headers: {
                "ids": [id]
            }
        }
        axios.delete("http://localhost:8081/api/phoneNumber", config)
        this.componentDidMount()
    }
    updatePhoneNumber = (idPhone, content) => {
        const id = this.props.id;
        let data = {
            id: id,
            listPhoneNumber: [{
                id: idPhone,
                phoneNumber: content
            }]
        }
        const respone = axios.put("http://localhost:8081/api/listsim", data)
        // this.componentDidMount()
    }
    addNewPhoneToList = (content) => {
        if (content == "" || content.length != 9) {
            alert("Yêu cầu nhập lại số điện thoại")
        }
        else {
            const id = this.props.id;
            let data = {
                id: id,
                listPhoneNumber: [{
                    id: null,
                    phoneNumber: content
                }]
            }
            console.log("Phone Number " + content)
            axios.put("http://localhost:8081/api/listsim", data)
            // this.componentDidMount()
        }
    }
    updateSimList = async (e) => {
        const data = {
            id: document.querySelector("input[name='id']").defaultValue,
            name: this.listName,
            note: document.querySelector('textarea').value
        }
        console.log(data)

        await axios.put("http://localhost:8081/api/listsim", data)
            .then((response) => {
                console.log(response)
            })
        this.hideAddWindow()
    }
    componentDidMount = async () => {
        const id = this.props.id;
        document.querySelector('.sub-container').style.display = 'block';
        await axios.get("http://localhost:8081/api/phoneNumber/list?id=" + id)
            .then(respone => {
                let data = respone.data
                this.listName = data.name
                this.setState({
                    openWindowObject: {
                        id: data.id,
                        name: data.name,
                        listPhoneNumber: data.listPhoneNumber,
                        note: data.note
                    }
                })
            })
        // http://localhost:8081/api/phoneNumber/list?id=" + id

    }
    componentDidUpdate = (prevProps, prevState) => {
        let pre = prevState.openWindowObject
        let cur = this.state.openWindowObject
        if (JSON.stringify(pre.listPhoneNumber) != JSON.stringify(cur.listPhoneNumber)
            || pre.name != cur.name || pre.note != cur.note
        ) {
            const id = this.props.id;
            document.querySelector('.sub-container').style.display = 'block';
            axios.get("http://localhost:8081/api/phoneNumber/list?id=" + id)
                .then(respone => {
                    let data = respone.data
                    this.listName = data.name
                    this.setState({
                        openWindowObject: {
                            id: data.id,
                            name: data.name,
                            listPhoneNumber: data.listPhoneNumber,
                            note: data.note
                        }
                    })
                })
            this.render()
        }
    }
    render() {
        const listSimCunrrentOpen = this.state.openWindowObject
        return (
            <div>
                <div className="sub-container" style={{ display: 'none' }}>
                    <div className="editCard">
                        <div className="editCard-delete">
                            <button
                                onClick={() => {
                                    this.hideAddWindow()
                                }}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#cc3f3f" }} />
                            </button>
                        </div>
                        <div className="editCard-name">
                            <input type="hidden" name="id"
                                defaultValue={listSimCunrrentOpen.id}
                            />
                            <label htmlFor="listName">
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff" }} />{" "}
                                Tên danh sách
                            </label>
                            <br />
                            <input
                                type="text"
                                name="listName"
                                defaultValue={listSimCunrrentOpen.name}
                                placeholder="Điền tên danh sách...."
                                onBlur={(e) => {
                                    this.listName = e.target.value
                                }}
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
                                    placeholder="Thêm mới sim tại đây...."
                                />
                                <button
                                    onClick={() => {
                                        this.addNewPhoneToList(document.querySelector("input[name='listNumber']").value)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} /> Thêm
                                </button>
                            </div>
                            <div className="editCard-list-table">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th className="col-2">STT</th>
                                            <th className="col-7">Sim</th>
                                            <th className="col-3">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listSimCunrrentOpen.listPhoneNumber.map((phone, index) => {
                                                var sdt = phone.phoneNumber
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <input type="tel" name="" id="" defaultValue={sdt}
                                                                onBlur={(e) => {
                                                                    this.updatePhoneNumber(phone.id, e.target.value)
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button className="action-btn remove-btn"
                                                                onClick={() => {
                                                                    this.removePhoneNumberOnAList(phone.id)
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#cc3f3f" }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
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
                            <textarea name="note" id="note" rows={10}
                                defaultValue={listSimCunrrentOpen.note}
                            />
                        </div>
                        <div className="editCard-save">
                            <button
                                onClick={
                                    this.updateSimList
                                }>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#ffffff" }} />{" "}
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subcontainer