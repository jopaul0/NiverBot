import Button from '../../../components/Button'
import { ModalBase } from '../../../components/Modal'
import './Confirm.css'
export default function ConfirmModal({ onClickFunction, onClose, isOpen }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose} className='modal-confirm'>
            <h2>
                ✔ Confirmação
            </h2>
            <p>
                Você tem certeza que deseja realizar essa operação?
            </p>
            <div>
                <Button message={'Realizar'} onClick={onClickFunction}/>
            </div>
        </ModalBase>
    )
}