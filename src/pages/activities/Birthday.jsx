import './Activities.css';
import { getBirthdayMessage, isSameDay } from '../../functions/utils/date.js'
import Button from '../../components/Button'
import { useState } from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const birthdays = [
    { name: "João", date: "2025-07-24", phone: "559999999999" },
    { name: "Maria", date: "2025-06-25", phone: "558888888888" },
    { name: "Carlos", date: "2025-06-26", phone: "557777777777" }
];


const BirthdayManual = () => {
    const [selected, setSelected] = useState([]);

    const toggleSelection = (person) => {
        setSelected(prev =>
            prev.some(p => p.name === person.name)
                ? prev.filter(p => p.name !== person.name)
                : [...prev, person]
        );
    };

    const isSelected = (name) => selected.some(p => p.name === name);


    const handleSend = () => {
        selected.forEach(({ name, date, phone }) => {
            console.log(`Enviar mensagem para ${name} (${phone}), aniversário em ${date}`);
            // Aqui você pode fazer a lógica de envio
        });
    };

    return (
        <div className="activity-container">
            <p className='activity-label-float'>Selecione aniversariantes para enviar mensagem</p>
            <div className='activity-panel'>
                <Button message={`Enviar para ${selected.length} pessoa(s)`} disable={selected.length <= 0} onClick={handleSend} />
            </div>
            <div className="timeline-wrapper">
                <VerticalTimeline layout="1-column">
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
        </div>
    );
};

export default BirthdayManual;
