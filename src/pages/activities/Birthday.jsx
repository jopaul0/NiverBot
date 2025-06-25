import './Activities.css'
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// Exemplo de aniversários
const birthdays = [
    { name: "João", date: "2025-06-24" },
    { name: "Maria", date: "2025-06-25" },
    { name: "Carlos", date: "2025-06-26" }
];

const BirthdayManual = () => {
    return (
        <div className="activity-container">
            <div className='activity-panel'>
                Olá
            </div>
            <div>
                <VerticalTimeline>
                    {birthdays.map((birthday, index) => (
                        <VerticalTimelineElement
                            key={index}
                            date={new Date(birthday.date).toLocaleDateString()}
                            iconStyle={{ background: '#204A53', color: '#fff' }}
                            contentStyle={{ background: '#f1f0ec', color: '#204A53' }}
                            contentArrowStyle={{ borderRight: '7px solid #f1f0ec' }}
                        >
                            <h3 className="vertical-timeline-element-title">{birthday.name}</h3>
                            <p>Aniversário 🎉</p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default BirthdayManual;
