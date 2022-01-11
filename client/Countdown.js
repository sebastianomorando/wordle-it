import { useState, useEffect } from "react";

const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

const Countdown = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const setTimer = () => {
            const seconds = 86400 + Math.floor((midnight.getTime() - Date.now()) / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            setMinutes(minutes % 60);
            setSeconds(seconds % 60);
            setHours(hours);
        };
        setTimer();
        const interval = setInterval(setTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div style={{ textAlign: 'center' }}>La prossima parola sarà disponibile tra:</div>
        <div className="countdown">
            <span>{('0' + hours).slice(-2)}</span>
            <span>:</span>
            <span>{('0' + minutes).slice(-2)}</span>
            <span>:</span>
            <span>{('0' + seconds).slice(-2)}</span>
        </div>
        </>
    )
}

export default Countdown;