import './ActiveArea.css';
import Terminal from '../Terminal';
import ActivityTab from '../ActivityTab';
const ActiveArea = ({logs, setLogs}) => {
    return (
        <section className="active-area">
            <Terminal logs={logs} setLog={setLogs} />
            <ActivityTab />
        </section>
    );
}
export default ActiveArea;