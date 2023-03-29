import { useEffect, useReducer, useState } from "react";
import "./App.css";

function App() {
	const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
		null
	);
	const [isPlaying, setIsPlaying] = useState(false);
	const [, update] = useReducer(() => ({}), {});

	useEffect(() => {
		const a = new Audio("/audio.mp3");
		a.onloadedmetadata = () => {
			setAudioElement(a);
		};
	}, []);

	useEffect(() => {
		if (audioElement) {
			if (isPlaying && audioElement.paused) {
				audioElement.play();
			} else {
				audioElement.pause();
			}
		}
	}, [audioElement, isPlaying]);

	useEffect(() => {
		const loop = () => {
			update();
			return requestAnimationFrame(loop);
		};
		const animationFrame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<div className="App">
			{audioElement ? (
				<div>
					<button
						style={{
							width: 100,
						}}
						onClick={() => setIsPlaying(!isPlaying)}
					>
						{isPlaying ? "Pause" : "Play"}
					</button>
					<input
						type="range"
						min="0"
						max={audioElement.duration}
						value={audioElement.currentTime}
						onChange={(e) => {
							audioElement.currentTime = Number(e.target.value);
							update();
						}}
					/>
				</div>
			) : (
				"Loading"
			)}
		</div>
	);
}

export default App;
