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
	const [user, setUser] = useState(null); // Tambah state untuk user
	const [loading, setLoading] = useState(true); // Tambah loading state

	// TAMBAH: Cek session dari READTalk
	useEffect(() => {
		const session = localStorage.getItem('readtalk_session');
		
		if (session) {
			setUser(JSON.parse(session));
			setLoading(false);
		} else {
			// Redirect ke halaman agree jika tidak ada session
			window.location.href = 'https://id-readtalk.pages.dev';
		}
	}, []);

	// TAMBAH: Tampilan loading
	if (loading) {
		return (
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				minHeight: '100vh' 
			}}>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<>
			{/* TAMBAH: User info card (opsional) */}
			{user && (
				<div style={{
					position: 'fixed',
					top: '10px',
					right: '10px',
					backgroundColor: '#f0f0f0',
					padding: '8px 16px',
					borderRadius: '20px',
					fontSize: '14px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
					zIndex: 1000
				}}>
					<span>👤 {user.userId?.substring(0, 8)}...</span>
				</div>
			)}

			{/* KONTEN ASLI - TIDAK DIHAPUS */}
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

			{/* TAMBAH: Tombol logout kecil */}
			<button
				onClick={() => {
					localStorage.removeItem('readtalk_session');
					window.location.href = 'https://id-readtalk.pages.dev';
				}}
				style={{
					position: 'fixed',
					bottom: '10px',
					right: '10px',
					padding: '4px 12px',
					fontSize: '12px',
					backgroundColor: '#ff0000',
					color: 'white',
					border: 'none',
					borderRadius: '16px',
					cursor: 'pointer',
					zIndex: 1000
				}}
			>
				Logout
			</button>
		</>
	);
}

export default App;
