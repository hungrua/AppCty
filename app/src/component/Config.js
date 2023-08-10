import React, { Component } from 'react'
import './sass/config.scss';
import '..//../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faUser, faKey, faSimCard } from '@fortawesome/free-solid-svg-icons'
export class Config extends Component {
    constructor(){
        super()
        this.apiKey = ""
        this.state ={
            listSim: []
        }
    }
    addConfigInfo= async (profilePath, idListSim)=>{
        await axios.post("/api/config?profilePath="+profilePath+"&idListSim="+idListSim)
            .then(response=>{
                alert("Lưu cấu hình thành công")
            })
    }

    fillSimListSelection = async ()=>{
        var listSim;
        await axios.get("/api/config")
            .then(response=>{
                listSim = response.data && response ? response.data: []    
            })
        this.setState({listSim:listSim})
    }
    componentDidMount = async () =>{
        this.fillSimListSelection()
    }
    componentDidUpdate = async () =>{
        this.fillSimListSelection()
    }
    
    render() {
        return (
            <div className='config-container'>
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
                            <button type="submit" className="button-submit br"
                            onClick={(e)=>{
                                e.preventDefault();
                                let profilePath = document.getElementById("Profile-Path").value
                                let idListSim = document.getElementById("select-sim").value
                                if(!profilePath || !idListSim ){
                                    alert("Vui lòng điền đủ thông tin")
                                }
                                this.addConfigInfo(profilePath, idListSim)
                            }}
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

export default Config