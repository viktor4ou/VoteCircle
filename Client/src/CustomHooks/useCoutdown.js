import { useState, useEffect } from "react";
export function useCountdown(targetDateString) {
    const targetDate = new Date(targetDateString).getTime();

    const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(targetDate - Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    if (timeLeft <= 0) {
        return "Time is up!";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
}
