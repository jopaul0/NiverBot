import './ActivityArea.css';
import Terminal from '../Terminal';
import ActivityActive from '../ActivityActive';
const ActivityArea = ({ logs, setLogs, setActivity, activity }) => {
    return (
        <section className='activity-area'>
            <ActivityActive setActivity={setActivity} activity={activity} />
            <Terminal logs={logs} setLog={setLogs} />
        </section>
    );
}
export default ActivityArea;