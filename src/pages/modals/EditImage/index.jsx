import '@/pages/modals/EditImage/EditImage.css';
import { ModalBase, SuccessModal, ErrorModal } from '@/components/Modal';
import Dropzone from '@/components/Dropzone';
import Button from '@/components/Button';
import { useState, useEffect } from "react";
import ConfirmModal from '@/pages/modals/Confirm';
export default function EditImageModal({ onClose, isOpen }) {
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchImage = async () => {
                const image = await window.electronAPI.getMediaImage();
                if (image) {
                    setData(image);
                }
            };
            fetchImage();
        }
    }, [isOpen]);

    const handleSave = async () => {
        if (!data) return;

        const success = await window.electronAPI.updateMediaImage(data);

        if (success) {
            setSuccess(true);
        } else {
            setError(true);
        }
        setOpen(false);
    };
    return (
        <>
            <ModalBase isOpen={isOpen} onClose={onClose} className='modal-edit-image'>
                <div className='left'>
                    {data ? (
                        <img
                            src={data}
                            alt="Pré-visualização"
                            className="preview-image"
                        />
                    ) : (
                        <p>Nenhuma imagem selecionada.</p>
                    )}
                </div>
                <div className='right'>
                    <Dropzone onFileRead={setData} accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} />
                    <Button message='Atualizar Imagem' onClick={() => { setOpen(true) }} />
                </div>
            </ModalBase>
            <ConfirmModal onClose={() => { setOpen(false) }} isOpen={open} onClickFunction={handleSave} />
            <SuccessModal onClose={() => { setSuccess(false) }} isOpen={success} message='Sucesso ao atualizar imagem!' />
            <ErrorModal onClose={() => { setError(false) }} isOpen={error} message='Error ao atualizar imagem.' />
        </>
    );
}