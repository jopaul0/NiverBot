import { useEffect, useState } from 'react';
import List from '@/components/List';
import { Check, Trash2, Image } from 'lucide-react';
import { ConfirmDeleteModal, ConfirmEditModal } from '@/pages/modals/Confirm';

export default function MessagePage() {
    const [messages, setMessages] = useState({});
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [openDel, setOpenDel] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const result = await window.electronAPI.getAllMessages();
            setMessages(result);
        };

        fetchMessages();
    }, []);

    const handleAddMessage = async (keyArray) => {
        await window.electronAPI.addMessage(keyArray);
        const updatedMessages = await window.electronAPI.getAllMessages();
        setMessages(updatedMessages);
    };

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        setEditedText(message?.text || '');
    };

    const handleSave = async () => {
        if (selectedMessage && editedText) {
            await window.electronAPI.updateMessage(selectedMessage.type, selectedMessage.id, editedText);
            const updatedMessages = await window.electronAPI.getAllMessages();
            setMessages(updatedMessages);
            setOpenEdit(false);
        }
    };

    const handleDelete = async () => {
        if (selectedMessage) {
            await window.electronAPI.deleteMessage(selectedMessage.type, selectedMessage.id);
            const updatedMessages = await window.electronAPI.getAllMessages();
            setMessages(updatedMessages);
            setSelectedMessage(null);
            setEditedText('');
            setOpenDel(false);
        }
    };

    return (
        <div className='page-content'>
            <div className='left' style={{ overflowY: 'auto' }}>
                <List
                    listName='Aniversário'
                    list={messages.birthday}
                    selectedMessage={selectedMessage}
                    onSelect={handleSelectMessage}
                    keyArray='birthday'
                    handleAddMessage={handleAddMessage}
                />
                <List
                    listName='Adiantado'
                    list={messages.earlyBirthday}
                    selectedMessage={selectedMessage}
                    onSelect={handleSelectMessage}
                    keyArray='earlyBirthday'
                    handleAddMessage={handleAddMessage}
                />
                <List
                    listName='Atrasado'
                    list={messages.lateBirthday}
                    selectedMessage={selectedMessage}
                    onSelect={handleSelectMessage}
                    keyArray='lateBirthday'
                    handleAddMessage={handleAddMessage}
                />
            </div>

            <div className='right'>
                <div className="selected-message-box">
                    <div className="border-message-box">
                        <h2>Mensagem Selecionada</h2>
                    </div>
                    <div className="body-message-box">
                        <textarea
                            disabled={!selectedMessage}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </div>
                    <div className="border-message-box footer">
                        <div style={{ display: 'flex' }}>
                            <button
                                onClick={() => { setOpenEdit(true) }}
                                disabled={!selectedMessage}
                                style={{
                                    backgroundColor: selectedMessage ? '#28a745' : '#3a3939',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: selectedMessage ? 'pointer' : 'not-allowed',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    if (selectedMessage) e.currentTarget.style.backgroundColor = '#218838';
                                }}
                                onMouseOut={(e) => {
                                    if (selectedMessage) e.currentTarget.style.backgroundColor = '#28a745';
                                }}
                            >
                                <Check size={18} />
                                Salvar
                            </button>

                            <button
                                onClick={() => { setOpenDel(true) }}
                                disabled={!selectedMessage}
                                style={{
                                    backgroundColor: selectedMessage ? '#dc3545' : '#3a3939',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: selectedMessage ? 'pointer' : 'not-allowed',
                                    transition: 'background-color 0.2s',
                                    marginLeft: '1rem'
                                }}
                                onMouseOver={(e) => {
                                    if (selectedMessage) e.currentTarget.style.backgroundColor = '#c82333';
                                }}
                                onMouseOut={(e) => {
                                    if (selectedMessage) e.currentTarget.style.backgroundColor = '#dc3545';
                                }}
                            >
                                <Trash2 size={18} />
                                Excluir
                            </button>
                        </div>
                        <button
                            onClick={() => { /* sua função aqui */ }}
                            style={{
                                backgroundColor: '#007bff', // azul como cor padrão para botão de mídia
                                color: 'white',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                marginLeft: '1rem'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#0069d9';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#007bff';
                            }}
                        >
                            <Image size={18} />
                            Imagem
                        </button>
                    </div>

                </div>

            </div>
            <ConfirmDeleteModal onClose={() => { setOpenDel(false) }} isOpen={openDel} onDelete={handleDelete} />
            <ConfirmEditModal onClose={() => { setOpenEdit(false) }} isOpen={openEdit} onEdit={handleSave} />
        </div>
    );
}
