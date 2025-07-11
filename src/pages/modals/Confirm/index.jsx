import Button from '@/components/Button';
import { ModalBase } from '@/components/Modal';
import '@/pages/modals/Confirm/Confirm.css';

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
                <Button message={'Realizar'} onClick={onClickFunction} />
            </div>
        </ModalBase>
    )
}

export function ConfirmDeleteModal({ onDelete, onClose, isOpen }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose} className='modal-confirm'>
            <h2>🗑 Confirmar Exclusão</h2>
            <p>Tem certeza que deseja deletar este elemento?</p>
            <div>
                <Button message={'Deletar'} onClick={onDelete} />
            </div>
        </ModalBase>
    );
}

export function ConfirmEditModal({ onEdit, onClose, isOpen }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose} className='modal-confirm'>
            <h2>✏️ Confirmar Edição</h2>
            <p>Tem certeza que deseja salvar as alterações desta mensagem?</p>
            <div>
                <Button message={'Salvar'} onClick={onEdit} />
            </div>
        </ModalBase>
    );
}
