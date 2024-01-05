import { Text } from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";

export const getDeadTime = () => {
    let deadline = new Date();
    if (localStorage.getItem("time")  && !localStorage.getItem("exam")) {
        const arr = localStorage.getItem("time").toString().split(":");
        // console.log(deadline.getMinutes(),parseInt(arr[1]));
        // console.log(deadline.getSeconds(),parseInt(arr[2]));
        deadline.setMinutes(deadline.getMinutes()+parseInt(arr[1]));
        deadline.setSeconds(deadline.getSeconds() + parseInt(arr[2]));
    }
    else{
        // if (localStorage.getItem("exam")) {
        //     localStorage.removeItem("exam")
        // }
            deadline.setMinutes(deadline.getMinutes()+ 29)
            deadline.setSeconds(deadline.getSeconds() + 60);
    }
    return deadline;
};
export const getTimeRemaining = (e) => {
    const total =
        Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
        (total / 1000 / 60) % 60
    );
    const hours = Math.floor(
        (total / 1000 / 60 / 60) % 24
    );
    return {
        total,
        hours,
        minutes,
        seconds,
    };
};

const Timer = () => {
	const Ref = useRef(null);
	const [timer, setTimer] = useState("00:00:00");

	const startTimer = (e) => {
		let { total, hours, minutes, seconds } =
			getTimeRemaining(e);
		if (total >= 0) {
			setTimer(
				(hours > 9 ? hours : "0" + hours) +
					":" +
					(minutes > 9
						? minutes
						: "0" + minutes) +
					":" +
					(seconds > 9 ? seconds : "0" + seconds)
			);
        if (localStorage.getItem("user")) {
            localStorage.setItem("time", (hours > 9 ? hours : "0" + hours) +":" +(minutes > 9 ? minutes: "0" + minutes) +":" +(seconds > 9 ? seconds : "0" + seconds));
        }
		}
	};
	const clearTimer = (e) => {
        if (localStorage.getItem("time")) {
            const arr = localStorage.getItem("time").toString().split(":");
            setTimer(`00:${arr[1]}:${arr[2]}`);
        }
        else{
            setTimer(`00:30:00`);
        }
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000);
		Ref.current = id;
	};


	useEffect(() => {
		clearTimer(getDeadTime());
	}, []);


	return (
		<div
			style={{ textAlign: "center", margin: "auto", color:"#FF6B6B" }}
		>
            <Text size="1.7rem" fw={"700"} >
            {timer}
            </Text>
			{/* <button onClick={onClickReset}>Reset</button> */}
		</div>
	);
};

export default Timer;
