// App.tsx
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
	const [loading, setLoading] = useState(true);

	// Cek session dari READTalk saat halaman dimuat
	useEffect(() => {
		const checkSession = () => {
			// Baca session dari localStorage
			const session = localStorage.getItem('readtalk_session');
			
			if (session) {
				const userData = JSON.parse(session);
				setUser(userData);
				setLoading(false);
				
				// Update last seen
				userData.lastSeen = new Date().toISOString();
				localStorage.setItem('readtalk_session', JSON.stringify(userData));
				
				console.log('Welcome from READTalk:', userData.userId);
			} else {
				// Cek apakah ada parameter di URL (fallback)
				const urlParams = new URLSearchParams(window.location.search);
				const sessionParam = urlParams.get('session');
				
				if (sessionParam) {
					try {
						const decodedData = JSON.parse(atob(decodeURIComponent(sessionParam)));
						localStorage.setItem('readtalk_session', JSON.stringify(decodedData));
						setUser(decodedData);
						setLoading(false);
						
						// Bersihkan URL
						window.history.replaceState({}, document.title, window.location.pathname);
					} catch (e) {
						console.error('Invalid session data');
						redirectToWelcome();
					}
				} else {
					// Tidak ada session, redirect ke halaman welcome
					redirectToWelcome();
				}
			}
		};

		const redirectToWelcome = () => {
			setLoading(true);
			setTimeout(() => {
				window.location.href = 'https://id-readtalk.pages.dev';
			}, 2000);
		};

		checkSession();
	}, []);

	// Fungsi logout
	const handleLogout = () => {
		localStorage.removeItem('readtalk_session');
		window.location.href = 'https://id-readtalk.pages.dev';
	};

	// Tampilan loading
	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Memverifikasi session...</p>
				<style>{`
					.loading-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						min-height: 100vh;
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
					}
					.spinner {
						border: 4px solid #f3f3f3;
						border-top: 4px solid #ff0000;
						border-radius: 50%;
						width: 40px;
						height: 40px;
						animation: spin 1s linear infinite;
						margin-bottom: 20px;
					}
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
				`}</style>
			</div>
		);
	}

	// Tampilan jika tidak ada session (redirecting)
	if (!user) {
		return (
			<div className="no-session">
				<h2>Sesi tidak ditemukan</h2>
				<p>Anda akan dialihkan ke halaman welcome...</p>
				<div className="spinner" style={{ width: '30px', height: '30px' }}></div>
			</div>
		);
	}

	return (
		<>
			{/* User Info Card - ala WhatsApp web */}
			<div className="user-info-card" style={{
				backgroundColor: '#f8f8f8',
				borderRadius: '12px',
				padding: '16px',
				margin: '20px auto',
				maxWidth: '600px',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				textAlign: 'left',
				border: '1px solid #e0e0e0'
			}}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
					<div style={{
						backgroundColor: '#ff0000',
						color: 'white',
						width: '40px',
						height: '40px',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: 'bold',
						fontSize: '18px'
					}}>
						{user.userId?.charAt(5).toUpperCase() || 'U'}
					</div>
					<div>
						<h3 style={{ margin: 0, color: '#333' }}>Welcome, User!</h3>
						<p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
							ID: {user.userId}
						</p>
					</div>
				</div>
				<div style={{ 
					display: 'flex', 
					justifyContent: 'space-between',
					alignItems: 'center',
					borderTop: '1px solid #e0e0e0',
					paddingTop: '12px',
					fontSize: '13px',
					color: '#666'
				}}>
					<span>🕐 Agreed: {new Date(user.agreedAt).toLocaleString()}</span>
					<button 
						onClick={handleLogout}
						style={{
							backgroundColor: 'transparent',
							color: '#ff0000',
							border: '1px solid #ff0000',
							padding: '4px 12px',
							borderRadius: '16px',
							cursor: 'pointer',
							fontSize: '12px',
							fontWeight: '500'
						}}
					>
						Logout
					</button>
				</div>
			</div>

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
							.then((data) => setName(data.name))
							.catch(err => console.error('API Error:', err));
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
