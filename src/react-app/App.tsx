// src/App.tsx
import { useState, useEffect } from "react"; // Tambah useEffect
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
	const [user, setUser] = useState(null); // Untuk menyadari user

	// SADARI user dari localStorage
	useEffect(() => {
		const session = localStorage.getItem('readtalk_session');
		if (session) {
			setUser(JSON.parse(session));
			console.log('User sadar:', JSON.parse(session).userId);
		}
	}, []);

	// TOMBOL LOGOUT
	const handleLogout = () => {
		localStorage.removeItem('readtalk_session');
		setUser(null); // Update state
		alert('Anda telah keluar');
		// BISA juga redirect, TAPI TIDAK WAJIB
		// window.location.href = 'https://id-readtalk.pages.dev';
	};

	return (
		<>
			{/* TOMBOL LOGOUT - muncul hanya jika user sadar */}
			{user && (
				<div style={{
					position: 'fixed',
					top: '10px',
					right: '10px',
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					backgroundColor: '#f0f0f0',
					padding: '8px 16px',
					borderRadius: '20px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
					zIndex: 1000
				}}>
					<span style={{ color: '#00A884' }}>●</span>
					<span style={{ fontSize: '14px' }}>
						{user.userId?.substring(0, 10)}...
					</span>
					<button
						onClick={handleLogout}
						style={{
							backgroundColor: '#ff0000',
							color: 'white',
							border: 'none',
							borderRadius: '16px',
							padding: '4px 12px',
							fontSize: '12px',
							cursor: 'pointer',
							marginLeft: '8px'
						}}
					>
						Logout
					</button>
				</div>
			)}

			{/* TEMPLATE ASLI - PERSIS SAMA */}
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://hono.dev/" target="_blank">
					<img src={honoLogo} className="logo cloudflare" alt="Hono logo" />
				</a>
				<a href="https://workers.cloudflare.com/" target="_blank">
					<img
						src={cloudflareLogo}
						className="logo cloudflare"
						alt="Cloudflare logo"
					/>
				</a>
			</div>
			<h1>Vite + React + Hono + Cloudflare</h1>
			<div className="card">
				<button
					onClick={() => setCount((count) => count + 1)}
					aria-label="increment"
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div className="card">
				<button
					onClick={() => {
						fetch("/api/")
							.then((res) => res.json() as Promise<{ name: string }>)
							.then((data) => setName(data.name));
					}}
					aria-label="get name"
				>
					Name from API is: {name}
				</button>
				<p>
					Edit <code>worker/index.ts</code> to change the name
				</p>
			</div>
			<p className="read-the-docs">Click on the logos to learn more</p>
		</>
	);
}

export default App;
