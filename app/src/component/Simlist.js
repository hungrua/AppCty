import React, { Component } from 'react'
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
            listSim: []
        }
        this.updatedPhone = []
        this.removedListSim = []
    }
    // Hiện thị thông tin chi tiết 1 danh sách
    showAddWindow = async (id) => {
        document.querySelector('.sub-container').style.display = 'block';
        let res = await axios.get("/phoneNumber/list?id=" + id);
        // '/api/listsim?id=' + id
        let data = res.data
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
    }
    // Đóng cửa sổ thông tin chi tiết 1 danh sách
    hideAddWindow = () => {
        this.setState(prevState => ({
            variables: {
                checkbox: true,
                openWindowObject: {
                    id: '',
                    name: '',
                    listPhoneNumber: [],
                    note: '',
                    updatedPhoneNumberList: [],
                }
            },
            listSim: prevState.listSim
        }))
        this.updatedPhone = []
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
    removePhoneNumberOnListSim = async(id) => {
        let config = {
            headers: {
                "ids": [id]
            }
        }
        await axios.delete("/api/phoneNumber", config)
    }
    //Xóa 1 danh sach sim
    removeListSim = async (id) => {
        let removeList=[]
        if(typeof id === "string" ){
            removeList.push(id)
        }
        else removeList = [...id]
        let config = {
            headers: {
                "ids": removeList
            }
        }
        console.log(removeList)
        await axios.delete("/api/listsim", config)
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
    addNewPhoneToList = (content) => {
        if(content=="" || content.length<11){
            alert("Yêu cầu nhập lại số điện thoại")
        }
        else{
            this.updatedPhone.push({
                id: null,
                phoneNumber: content
            })
        }
    }
    // Chỉnh sửa chi tiết 1 danh sách sim
    updateSimList = async () => {
        const data = {
            id: document.querySelector("input[name='id']").defaultValue,
            name: document.querySelector("input[name='listName']").value,
            listPhoneNumber: this.updatedPhone,
            note: document.querySelector('textarea').value
        }
        await axios({
            method:'PUT',
            url: '/simlist',
            data: data
        }).then((response)=>{
            alert(response)
        })
        this.hideAddWindow()
        console.log(data)
    }
    //Thêm 1 danh sách sim 
    addSimList = async (name,file)=>{
        let formData = new FormData()
        formData.append('file',file)
        formData.append('name',name)
        const config ={
            headers: { 'content-type': 'multipart/form-data' }
        }
        await axios.post('/api/file',formData,config)
            .then(response => {
                console.log(response)
            })
    }
    // Hiển thị danh sách các danh sách sim
    removeMultiSimList = () => {
        let lists  = document.querySelectorAll("input[type='checkbox']");
        lists.forEach(list => {
            if(list.checked === true) {
                this.removedListSim.push(list.getAttribute("list_id"))
            }
        })
        this.removeListSim(this.removedListSim)
        // console.log(this.removedListSim)
        this.removedListSim = []
    }
    fetchData = async()=>{
        let res = await axios.get("http://localhost:3001/listSim")
        // '/api/listsim'
        this.setState({
            listSim: res && res.data ? res.data : []
        })
    }
    async componentDidMount() {
        await this.fetchData()
    }
    async componentDidUpdate(prevState){
        if(this.state.listSim !== prevState.listSim){
            await this.fetchData()
        }
    }
    render() {
        const listSim = { ...this.state.listSim }
        const listSimCunrrentOpen = { ...this.state.variables.openWindowObject }
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
                            method="post"
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
                                onClick={(e)=>{
                                    let name = document.querySelector("#newListName").value
                                    let file = document.querySelector("#file-upload").value
                                    e.preventDefault();
                                    this.addSimList(name,file)
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
                                                <input type="checkbox" name="" list_id = {list.id}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{list.name}</td>
                                            <td>{list.totalPhoneNumber}</td>
                                            <td>{list.note}</td>
                                            <td>
                                                <button className="action-btn edit-btn" onClick={this.showAddWindow}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#24c79f" }} />
                                                </button>
                                                <button className="action-btn remove-btn"
                                                onClick={(e)=>{
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
                        </tbody>
                    </table>
                    <div className='mullti_delete d-flex justify-content-end' 
                        onClick={this.removeMultiSimList}
                    >
                        <button className='btn btn-outline-danger'>Xóa</button>
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
                                                            onClick={()=>{
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
                            <button onClick={this.updateSimList}>
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