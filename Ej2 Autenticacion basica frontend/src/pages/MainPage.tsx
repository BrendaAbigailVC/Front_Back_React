import React, { useState, useEffect } from "react"

interface User {
  username: string
  email: string
  password: string
}

const MainPage = () => {
  const [registerData, setRegisterData] = useState<User>({ username: "", email: "", password: "" })
  const [loginData, setLoginData] = useState<{ email: string; password: string }>({ email: "", password: "" })
  const [token, setToken] = useState<string | null>(null)
  const [registerMsg, setRegisterMsg] = useState("")
  const [loginMsg, setLoginMsg] = useState("")
  const [profileMsg, setProfileMsg] = useState("")
  const [users, setUsers] = useState<User[]>([])

  const BASE_URL = "http://localhost:5001"

  const fetchUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`)
    const data: Omit<User, "password">[] = await res.json()
    setUsers(data.map(user => ({ ...user, password: "" })))
  }

  const handleRegister = async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    })
    const data = await res.json()
    setRegisterMsg(data.msg || JSON.stringify(data.errors || data))

    if (res.status === 201) {
      setRegisterData({ username: "", email: "", password: "" }) 
      fetchUsers()
    }
  }

  const handleLogin = async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
    const data = await res.json()
    if (data.token) {
      setToken(data.token)
      setLoginMsg("¡Login exitoso!")
    } else {
      setLoginMsg(data.msg || "Error al iniciar sesión")
    }
  }

  const fetchProfile = async () => {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const text = await res.text()
    setProfileMsg(text)
  }

  useEffect(() => {
    fetchUsers()
    if (token) fetchProfile()
  }, [token])

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Gestión de Usuarios</h1>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Registro</h4>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleRegister}>
                Registrar
              </button>
              {registerMsg && <div className="alert alert-info mt-3">{registerMsg}</div>}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <button className="btn btn-success w-100" onClick={handleLogin}>
                Iniciar sesión
              </button>
              {loginMsg && <div className="alert alert-info mt-3">{loginMsg}</div>}
            </div>
          </div>
        </div>
      </div>
      

      {token && (
        <div className="card shadow-sm mt-5 border-success">
          <div className="card-body">
            <h4 className="card-title text-success">Perfil Protegido</h4>
            <p>{profileMsg}</p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <h4>Usuarios Registrados</h4>
        {users.length === 0 ? (
          <p className="text-muted">No hay usuarios registrados.</p>
        ) : (
          <ul className="list-group">
            {users.map((u, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{u.username}</strong>
                <span className="text-muted">{u.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MainPage
