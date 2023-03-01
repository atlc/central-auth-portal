import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AUTH_SERVER_URL = "http://localhost:3001/auth";

function App() {
    const [email, setEmail] = useState("Jameson_Hills@gmail.com");
    const [password, setPassword] = useState("hunter2");
    const [isLogin, setIsLogin] = useState(true);

    // useEffect(() => {
    //     const token = localStorage.getItem("TOKEN");

    //     if (!token) return;

    //     // hit up API verification route
    //     // if current token is still good, run below code

    //     const parsedURL = new URL(window.location.href);
    //     const [originator] = new URLSearchParams(parsedURL.search).getAll("originator");

    //     const redirectingURL = originator + `?token=${token}`;
    //     window.location.href = redirectingURL;
    // }, []);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let url = AUTH_SERVER_URL;
        url += isLogin ? "/login" : "/register";

        console.log({ url });

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
        } else {
            if (data.token) {
                const token = data.token;
                localStorage.setItem("TOKEN", token);

                const parsedURL = new URL(window.location.href);
                const [originator] = new URLSearchParams(parsedURL.search).getAll("originator");

                const redirectingURL = originator + `?token=${token}`;
                window.location.href = redirectingURL;
            }
        }
    };

    return (
        <main className="container">
            <div className="row justify-content-center mt-5">
                <form className="bg-secondary shadow p-3 rounded-2">
                    <h4 onClick={() => setIsLogin(!isLogin)}>
                        <div className="form-check form-switch">
                            <input className="form-check-input" checked={isLogin} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label text-black" htmlFor="flexSwitchCheckDefault">
                                {isLogin ? "Logging in" : "Registering"}. Need to {isLogin ? "register" : "login"}?
                            </label>
                        </div>
                    </h4>
                    <label className="text-black">Email or Username</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                    <label className="text-black">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                    <button onClick={handleLogin} className="btn btn-outline-dark mt-2 ">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}

export default App;
