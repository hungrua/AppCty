import React, { Component, useState } from 'react'
import './sass/simlist.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faList, faSimCard, faPlus,
    faMobileScreenButton, faFileExcel, faPenToSquare, faTrashCan, faCircleXmark, faNoteSticky, faFloppyDisk
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export class Simlist extends Component {
    constructor() {
        super();
        this.state = {
            variables: {
                checkbox: true,
                openWindowObject: {
                    id: '',
                    name: '',
                    listPhoneNumber: [],
                    note: '',
                    updatedPhoneNumberList: [],
                },
            },
            listSim: [],
        }
        this.updatedPhone = []
        this.removedListSim = []
        this.listName = ""
    }
    // Hiện thị thông tin chi tiết 1 danh sách
    showAddWindow = (id) => {
        if (sessionStorage.getItem("running") == 1) {
            alert("Tiến trình đang chạy không được phép sửa")
        }
        else {
            document.querySelector('.sub-container').style.display = 'block';
            axios.get("http://localhost:8081/api/phoneNumber/list?id=" + id)
            // 'http://localhost:8081/api/listsim?id=' + id
            .then(response => {
                let data = response.data
                this.listName = data.name
                this.setState({
                    variables: {
                        openWindowObject: {
                            id: data.id,
                            name: data.name,
                            listPhoneNumber: data.listPhoneNumber,
                            note: data.note,
                            updatedPhoneNumberList: [],
                        },
                    }
                })
                console.log("Name of list " + this.state.variables.openWindowObject.name)                                              
            })
        }
    }
    // Đóng cửa sổ thông tin chi tiết 1 danh sách
    hideAddWindow = () => {
        document.querySelector('.sub-container').style.display = 'none';
    }
    //Tích chọn toàn bộ danh sách
    tickAllCheckbox = () => {
        const tmp = { ...this.state }
        document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
            checkbox.checked = tmp.variables.checkbox;
        })
        this.setState(prevState => ({
            variables: {
                checkbox: prevState.variables.checkbox === true ? false : true
            }
        }))
    }
    // Xóa 1 số số điện thoại nào đó trong danh sách sim
    removePhoneNumberOnListSim = async (id) => {
        let config = {
            headers: {
                "ids": [id]
            }
        }
        await axios.delete("http://localhost:8081/api/phoneNumber", config)
    }
    //Xóa 1 danh sach sim
    removeListSim = async (id) => {
        if (sessionStorage.getItem("running") == 1) {
            alert("Tiến trình đang chạy không được phép xóa")
        }
        else {
            let removeList = []
            if (typeof id === "string") {
                removeList.push(id)
            }
            else removeList = [...id]
            let config = {
                headers: {
                    "ids": removeList
                }
            }
            console.log(removeList)
            await axios.delete("http://localhost:8081/api/listsim", config)
            this.setState(prevState=>({
                variables :{
                    ...prevState.variables,
                    openWindowObject:{
                        id: '',
                        name: '',
                        listPhoneNumber: [],
                        note: '',
                        updatedPhoneNumberList: [],
                    }
                },
                listSim : prevState.listSim
            }))
            this.listName = ""
            this.componentDidMount()
        }
    }
    // Thêm các số chỉnh sửa vào danh sách chỉnh sửa
    addToUpdatedPhoneList = (id, content) => {
        var tmp = this.updatedPhone.findIndex(phone => phone.id === id)
        let updatedPhone = {
            id: id,
            phoneNumber: content
        }
        if (tmp != -1) {
            this.updatedPhone.splice(tmp, 1, updatedPhone)
        }
        else {
            this.updatedPhone.push(updatedPhone)
        }
        // console.log(this.updatedPhone)
    }
    addNewPhoneToList = (list_id,content) => {
        if (content == "" || content.length != 9) {
            alert("Yêu cầu nhập lại số điện thoại")
        }
        else {
            let data = {
                id: list_id,
                listPhoneNumber :[
                    {
                        id: null,
                        phoneNumber : content
                    }
                ]
            }
            console.log(data)
            axios.put("http://localhost:8081/api/listsim", data)
                .then((response) => {
                    // let data = 
                    // console.log("data \n")
                    // console.log(data)
                    this.setState(prevState => ({
                        variables: {
                            openWindowObject:{
                                // ...prevState.variables.openWindowObject,
                                name: prevState.variables.openWindowObject.name,
                                listPhoneNumber : response.data
                            }
                        },
                        // listSim : prevState.listSim
                    }))
                    console.log(this.state.variables.openWindowObject.listPhoneNumber)
                    this.componentDidMount()
                    // this.render()
                })
        }
    }
    // Chỉnh sửa chi tiết 1 danh sách sim
    updateSimList = async (id,name,listPhoneNumber,note) => {
        const data = {
            id,
            name : this.listName,
            listPhoneNumber,
            note
        }
        console.log("Test data" + JSON.stringify(data))
        await axios.put("http://localhost:8081/api/listsim", data)
            .then((response) => {
                console.log(response)
                this.hideAddWindow()
                this.componentDidMount()
            })
        console.log(data)
    }
    //Thêm 1 danh sách sim 
    addSimList = (name, file) => {
        var formData = new FormData()
        formData.append('file', file)
        formData.append('name', name)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log(formData.get('file'))
        axios.post('http://localhost:8081/api/file', formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then((response) => {
                alert('File uploaded successfully.');
                this.componentDidMount()
            })
            .catch((error) => {
                alert('Error uploading file.');
            });
    }
    // Hiển thị danh sách các danh sách sim
    removeMultiSimList = () => {
        if(sessionStorage.getItem("running") == 1) {
            alert("Tiến trình đang chạy không được phép xóa")
        }
        else {
            let lists = document.querySelectorAll("input[type='checkbox']");
            lists.forEach(list => {
                if (list.checked === true) {
                    this.removedListSim.push(list.getAttribute("list_id"))
                }
            })
            this.removeListSim(this.removedListSim)
            // console.log(this.removedListSim)
            this.removedListSim = []

        }
    }
    fetchData = async () => {
        let res = await axios.get("http://localhost:8081/api/listsim")
        // 'http://localhost:8081/api/listsim'
        this.setState({
            listSim: res && res.data ? res.data : []
        })
    }
    componentDidMount() {
        this.fetchData()
    }
    render() {
        const listSim = { ...this.state.listSim }
        const listSimCunrrentOpen = this.state.variables.openWindowObject
        console.log("Name of list number " + listSimCunrrentOpen.name)
        const addPhone = (phone) => {
            if (phone != "") return (
                <tr>
                    <td></td>
                    <td>
                        <input type="tel" name="" id="" 
                        // defaultValue={addedPhoneNumber} 
                        />
                    </td>
                    <td>
                        <button className="action-btn remove-btn"
                            onClick={() => {
                                alert("Lưu danh sách trước khi thực hiện thao tác")
                            }}
                        >
                        </button>
                    </td>
                </tr>

            )
        }
        return (
            <div className="simlist-container">
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
                            className="d-flex justify-content-between"
                        >
                            <div className="searcher-inputTel d-flex align-items-center">
                                <FontAwesomeIcon icon={faMobileScreenButton} style={{
                                    position: "absolute",
                                    left: "18px",
                                    color: "#24c79f"

                                }} />
                                <input
                                    type="text"
                                    name="listName"
                                    id="newListName"
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
                            <button
                                onClick={(e) => {
                                    let name = document.querySelector("#newListName").value
                                    let file = document.querySelector("#file-upload").files[0]
                                    e.preventDefault();
                                    this.addSimList(name, file)
                                }}
                            >Thêm mới</button>
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
                            {

                                Object.values(listSim).map((list, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" name="" list_id={list.id}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{list.name}</td>
                                            <td>{list.totalPhoneNumber}</td>
                                            <td>{list.note}</td>
                                            <td>
                                                <button className="action-btn edit-btn" onClick={() => {
                                                    this.showAddWindow(list.id)
                                                }}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#24c79f" }} />
                                                </button>
                                                <button className="action-btn remove-btn"
                                                    onClick={(e) => {
                                                        const checkbox = e.currentTarget.closest("tr").querySelector("input[type='checkbox']");
                                                        this.removeListSim(checkbox.getAttribute("list_id"))
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#cc3f3f" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })

                            }
                            {addPhone}
                        </tbody>
                    </table>
                    <div className='mullti_delete d-flex justify-content-end'
                        onClick={this.removeMultiSimList}
                    >
                        <button className='btn btn-outline-danger' id="remove-many">Xóa</button>
                    </div>
                </main>
                <div className="sub-container" style={{ display: "none" }}>
                    <div className="editCard">
                        <div className="editCard-delete">
                            <button onClick={this.hideAddWindow}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#cc3f3f" }} />
                            </button>
                        </div>
                        <div className="editCard-name">
                            <input type="hidden" name="id" defaultValue={listSimCunrrentOpen.id} />
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
                                onBlur ={(e)=>{
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
                                    id='newPhoneNumber'
                                    placeholder="Thêm mới sim tại đây...."
                                />
                                <button
                                    onClick={() => {
                                        this.addNewPhoneToList(listSimCunrrentOpen.id,document.querySelector("input[name='listNumber']").value)
                                        document.querySelector("#newPhoneNumber").value = ""
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
                                            Object.values(listSimCunrrentOpen.listPhoneNumber).map((phone, index) => {
                                                var sdt = phone.phoneNumber
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <input type="tel" name="" id="" defaultValue={sdt}
                                                                onBlur={(e) => {
                                                                    this.addToUpdatedPhoneList(phone.id, e.target.value)
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
                            <textarea name="note" id="note" rows={10} defaultValue={listSimCunrrentOpen.note} />
                        </div>
                        <div className="editCard-save">
                            <button 
                            onClick={()=>{
                                const id=  document.querySelector("input[name='id']").defaultValue
                                const name =  document.querySelector("input[name='listName']").value

                                const listPhoneNumber =   this.updatedPhone
                                const note = document.querySelector('textarea').value
                                this.updateSimList(id,name,listPhoneNumber,note)
                            }}>
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

export default Simlist