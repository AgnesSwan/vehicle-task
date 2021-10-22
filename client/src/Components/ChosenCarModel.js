import React, { useState } from "react";
import './ChosenCarModal.css'
import { FaCarAlt } from 'react-icons/fa'

const ChosenCarModal = ({ onClose, children }) => {
    const [confirm, setConfirm] = useState(false)
    return (
        <div class="modal">
            <div className="modal_container">
                <div class="content">{children}
                <FaCarAlt size='60px' className="icon" />
                </div>
                {confirm && <p style={{textAlign:'center', color: 'red'}}>The order has been confirmed</p>}
                <button onClick={()=> {
                    setConfirm(true)
                    setTimeout(() => {
                        onClose()
                      }, 5000)
                    }}>
                    Confirm
                </button>
                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ChosenCarModal