import { useEffect, useState } from 'react';

export default function MessagePage() {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const result = await window.electronAPI.getAllMessages();
            setMessages(result);
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Mensagens:</h1>
        </div>
    );
}
