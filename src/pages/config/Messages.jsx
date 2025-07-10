import { useEffect, useState } from 'react';
import List from '@/components/List';


export default function MessagePage() {
    const [messages, setMessages] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

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

    return (
        <div className='page-content'>
            <div className='left' style={{ overflowY: 'auto' }}>
                <List
                    listName='Aniversário'
                    list={messages.birthday}
                    selectedMessage={selectedMessage}
                    onSelect={setSelectedMessage}
                    keyArray='birthday'
                    handleAddMessage={handleAddMessage}
                />
                <List
                    listName='Adiantado'
                    list={messages.earlyBirthday}
                    selectedMessage={selectedMessage}
                    onSelect={setSelectedMessage}
                    keyArray='earlyBirthday'
                    handleAddMessage={handleAddMessage}
                />
                <List
                    listName='Atrasado'
                    list={messages.lateBirthday}
                    selectedMessage={selectedMessage}
                    onSelect={setSelectedMessage}
                    keyArray='lateBirthday'
                    handleAddMessage={handleAddMessage}
                />

            </div>
            <div className='right'>
                {selectedMessage ? (
                    <div className="selected-message">
                        <h2>Mensagem Selecionada</h2>
                        <p>{selectedMessage}</p>
                    </div>
                ) : (
                    <p>Nenhuma mensagem selecionada.</p>
                )}
            </div>

        </div>
    );
}
