// src/App.tsx - public.soeparnocorp
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");
	const [user, setUser] = useState(null);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	// CEK SESSION - harus ada untuk masuk
	useEffect(() => {
		const session = localStorage.getItem('readtalk_session');
		
		if (session) {
			setUser(JSON.parse(session));
		} else {
			// Tidak ada session, balik ke halaman agree
			window.location.href = 'https://id-readtalk.pages.dev';
		}
	}, []);

	// FUNGSI LOGOUT - seamless balik ke halaman agree
	const handleLogout = () => {
		// Hapus session
		localStorage.removeItem('readtalk_session');
		
		// Set flag untuk komunikasi ke halaman agree
		sessionStorage.setItem('justLoggedOut', 'true');
		
		// Redirect balik ke halaman agree
		window.location.href = 'https://id-readtalk.pages.dev';
	};

	return (
		<>
			{/* USER INFO - kecil di pojok, seperti status WhatsApp */}
			{user && (
				<div style={{
					position: 'fixed',
					top: '10px',
					right: '10px',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					backgroundColor: 'rgba(255,255,255,0.9)',
					padding: '6px 12px',
					borderRadius: '20px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
					zIndex: 1000,
					fontSize: '13px'
				}}>
					<span style={{
						backgroundColor: '#00A884',
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						display: 'inline-block'
					}}></span>
					<span>{user.userId?.substring(0, 8)}...</span>
					<button
						onClick={() => setShowLogoutConfirm(true)}
						style={{
							background: 'none',
							border: 'none',
							color: '#ff0000',
							cursor: 'pointer',
							fontSize: '12px',
							padding: '2px 6px',
							marginLeft: '4px'
						}}
					>
						✕
					</button>
				</div>
			)}

			{/* MODAL KONFIRMASI LOGOUT - seperti WhatsApp */}
			{showLogoutConfirm && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0,0,0,0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 2000
				}}>
					<div style={{
						backgroundColor: 'white',
						padding: '20px',
						borderRadius: '12px',
						maxWidth: '300px',
						textAlign: 'center'
					}}>
						<h3 style={{ margin: '0 0 10px' }}>Keluar dari READTalk?</h3>
						<p style={{ margin: '0 0 20px', color: '#666' }}>
							Anda akan kembali ke halaman welcome.
						</p>
						<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
							<button
								onClick={() => setShowLogoutConfirm(false)}
								style={{
									padding: '8px 16px',
									border: '1px solid #ccc',
									background: 'white',
									borderRadius: '20px',
									cursor: 'pointer'
								}}
							>
								Batal
							</button>
							<button
								onClick={handleLogout}
								style={{
									padding: '8px 16px',
									background: '#ff0000',
									color: 'white',
									border: 'none',
									borderRadius: '20px',
									cursor: 'pointer'
								}}
							>
								Keluar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* TEMPLATE ASLI - TIDAK BERUBAH */}
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
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>Edit <code>src/App.tsx</code> and save to test HMR</p>
			</div>
			<div className="card">
				<button onClick={() => {
					fetch("/api/")
						.then((res) => res.json())
						.then((data) => setName(data.name));
				}}>
					Name from API is: {name}
				</button>
				<p>Edit <code>worker/index.ts</code> to change the name</p>
			</div>
			<p className="read-the-docs">Click on the logos to learn more</p>
		</>
	);
}

export default App;
