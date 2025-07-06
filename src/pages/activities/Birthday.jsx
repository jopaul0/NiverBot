import '@/pages/activities/Activities.css';
import Button from '@/components/Button'
import { useState, useEffect } from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import DateRangePicker from '../../components/DateRangePicker/index.jsx';
import { addDays, subDays } from 'date-fns';
import { X } from 'lucide-react';
import ConfirmModal from "@/pages/modals/Confirm";

const getBirthdayMessage = (dateString) => {
    const today = new Date();
    const birthday = new Date(dateString);
    const currentYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    const diffTime = currentYearBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isSameDay(today, currentYearBirthday)) {
        return "Aniversário 🎉";
    } else if (diffDays > 0) {
        return `Em ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    } else {
        return `Há ${Math.abs(diffDays)} dia${Math.abs(diffDays) > 1 ? 's' : ''}`;
    }
}

export function isSameDay(date1, date2) {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth()
    );
}

const BirthdayManual = ({ loading, setLoading, connected, setActivity }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [birthdays, setBirthdays] = useState([]);
    const today = new Date();
    const initialRange = {
        startDate: subDays(today, 7),
        endDate: addDays(today, 7),
        key: 'selection'
    };
    const [range, setRange] = useState(initialRange);

    useEffect(() => {
        if (!range) return;

        const loadBirthdays = async () => {
            try {
                const result = await window.electronAPI.getBirthdays(range);
                setBirthdays(Array.isArray(result) ? result : []);
            } catch (err) {
                setBirthdays([]);
            }
        };

        loadBirthdays();
    }, [range]);

    const toggleSelection = (person) => {
        setSelected(prev =>
            prev.some(p => p.name === person.name)
                ? prev.filter(p => p.name !== person.name)
                : [...prev, person]
        );
    };

    const isSelected = (name) => selected.some(p => p.name === name);


    const handleSend = async () => {
        setLoading(true);
        try {
            const response = await window.electronAPI.whatsappSendBirthdayManualMessage(selected);
            console.log(response);
        } catch (error) {
            window.electronAPI.sendLog(`Erro ao enviar mensagem de aniversário: ${error.message || error}`);
        }
        setSelected([])
        setLoading(false);
        setOpen(false);
        setActivity(false);
    };

    return (
        <div className="activity-container">
            <p className='activity-label-float'>Selecione aniversariantes para enviar mensagens</p>
            <button className='btn-close-activity' onClick={() => { setActivity(false) }}><X size={16} /></button>
            <div className='activity-panel'>
                <div className="custom-date-range">
                    <DateRangePicker className="data-range" onChange={setRange} />
                </div>
                <Button message={`Enviar para ${selected.length} pessoa(s)`} disable={selected.length <= 0 || loading || !connected} onClick={() => { setOpen(true) }} />
            </div>
            <div className="timeline-wrapper">
                <VerticalTimeline>
                    {birthdays.map((birthday, index) => {
                        const selectedStyle = isSelected(birthday.name)
                            ? {
                                background: '#dce5e5',
                                color: '#10292f',
                                cursor: 'pointer',
                                border: '2px solid #204A53',
                                transition: 'background .3s ease'
                            }
                            : {
                                background: '#f1f0ec',
                                color: '#204A53',
                                cursor: 'pointer',
                                transition: 'background .3s ease'
                            };

                        return (
                            <VerticalTimelineElement
                                key={index}
                                date={new Date(birthday.date).toLocaleDateString()}
                                iconStyle={{
                                    background: isSelected(birthday.name) ? '#10292f' : '#204A53',
                                    color: '#fff'
                                }}
                                contentStyle={selectedStyle}
                                contentArrowStyle={{
                                    borderRight: isSelected(birthday.name)
                                        ? '7px solid #204A53'
                                        : '7px solid #f1f0ec',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onTimelineElementClick={() => toggleSelection(birthday)}
                            >
                                <h3>{birthday.name}</h3>
                                <p>{getBirthdayMessage(birthday.date)}</p>
                            </VerticalTimelineElement>


                        );
                    })}
                </VerticalTimeline>
            </div>
            <ConfirmModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onClickFunction={handleSend}
            />
        </div>
    );
};

export default BirthdayManual;
