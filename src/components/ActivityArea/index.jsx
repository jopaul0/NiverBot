import '@/components/ActivityArea/ActivityArea.css';
import Terminal from '@/components/ActivityArea/Terminal';
import ActivityActive from '@/components/ActivityArea/ActivityActive';
const ActivityArea = ({ logs, setLogs, setActivity, activity, activityTab, loading, setLoading, connected}) => {
    return (
        <section className='activity-area'>
            <ActivityActive setActivity={setActivity} activity={activity} activityTab={activityTab} loading={loading}
                setLoading={setLoading} connected={connected}/>
            <Terminal logs={logs} setLog={setLogs} />
        </section>
    );
}
export default ActivityArea;