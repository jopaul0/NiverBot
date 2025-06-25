import './ActivityActive.css';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    initial: { y: 300, scale: 0.5, opacity: 0 },
    animate: {
        y: 0,
        scale: 0.5,
        opacity: 1,
        transition: { duration: 0.4 },
    },
    scaleUp: {
        scale: 1,
        transition: { delay: 0.4, duration: 0.3 },
    },
    scaleDown: {
        scale: 0.5,
        transition: { duration: 0.3 },
    },
    exit: {
        y: 300,
        opacity: 0,
        transition: { delay: 0.3, duration: 0.4 },
    },
};

const ActivityActive = ({ activity }) => {
    return (
        <AnimatePresence mode="wait">
            {activity && (
                <motion.div
                    className="activity-active"
                    variants={variants}
                    initial="initial"
                    animate={["animate", "scaleUp"]}
                    exit={["scaleDown", "exit"]}
                >
                    Atividade Ativa
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ActivityActive;
