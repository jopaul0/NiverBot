import { ModalBase } from '@/components/Modal';

export default function ModalNotice({ onClose, isOpen, names = [] }) {
    const formatName = (fullName) => {
        const firstName = fullName.split(' ')[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    };

    const renderMessage = () => {
        if (names.length === 0) {
            return "Nenhum aniversário hoje.";
        } else if (names.length === 1) {
            return `Hoje é aniversário de ${formatName(names[0])}! 🎉`;
        } else {
            const formattedNames = names.map(formatName);
            const allButLast = formattedNames.slice(0, -1).join(', ');
            const last = formattedNames[formattedNames.length - 1];
            return `Hoje é aniversário de ${allButLast} e ${last}! 🎉`;
        }
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} className='modal-notice'>
            <h2 style={{ textAlign: 'center' }}>🎂 Aviso de Aniversariantes</h2>
            <p>{renderMessage()}</p>
        </ModalBase>
    );
}
