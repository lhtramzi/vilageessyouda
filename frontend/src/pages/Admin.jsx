// frontend/src/pages/Room.jsx
Import React, { useContext, useEffect, useState } from « react » ;
Import { useParams, useNavigate } from « react-router-dom » ;
Import socket from « ../services/socket » ;
Import GameRoom from « ../components/GameRoom » ;
Import { ThemeContext } from « ../contexts/ThemeContext » ;

Function Room() {
  Const { roomId } = useParams() ;
  Const navigate = useNavigate() ;
  Const { theme } = useContext(ThemeContext) ;
  Const [playerName, setPlayerName] = useState(« « ) ;
  Const [joined, setJoined] = useState(false) ;

  useEffect(() => {
    if ( !roomId) {
      navigate(« / ») ;
    }
  }, [roomId, navigate]) ;

  Const handleJoinRoom = () => {
    If (playerName.trim()) {
      Socket.emit(« joinRoom », { roomId, name : playerName }) ;
      setJoined(true) ;
    }
  } ;

  Return (
    <div className={`room-page ${theme}`}>
      { !joined ? (
        <div className= »join-form »>
          <h2>الانضمام إلى الغرفة : {roomId}</h2>
          <input
            Type= »text »
            Placeholder= »اسم اللاعب »
            Value={playerName}
            onChange={€ => setPlayerName(e.target.value)}
            className= »room-input »
          />
          <button onClick={handleJoinRoom} className= »room-button »>
            انضم
          </button>// frontend/src/pages/Admin.jsx
Import React, { useContext, useEffect, useState } from « react » ;
Import { useNavigate } from « react-router-dom » ;
Import ControlPanel from « ../components/ControlPanel » ;
Import { ThemeContext } from « ../contexts/ThemeContext » ;

Function Admin() {
  Const { theme } = useContext(ThemeContext) ;
  Const [authenticated, setAuthenticated] = useState(false) ;
  Const [password, setPassword] = useState(« « ) ;
  Const navigate = useNavigate() ;

  Const handleLogin = () => {
    Const storedPassword = import.meta.env.VITE_ADMIN_PASSWORD ;
    If (password === storedPassword) {
      setAuthenticated(true) ;
    } else {
      Alert(« كلمة المرور غير صحيحة ») ;
    }
  } ;

  useEffect(() => {
    if ( !authenticated) {
      document.title = « تسجيل دخول الراوي » ;
    } else {
      Document.title = « لوحة تحكم الراوي » ;
    }
  }, [authenticated]) ;

  Return (
    <div className={`admin-page ${theme}`}>
      { !authenticated ? (
        <div className= »admin-login-form »>
          <h2>دخول الراوي</h2>
          <input
            Type= »password »
            Placeholder= »كلمة المرور »
            Value={password}
            onChange={€ => setPassword(e.target.value)}
            className= »admin-password-input »
          />
          <button onClick={handleLogin} className= »admin-login-button »>
            دخول
          </button>
          <button onClick={() => navigate(« / »)} className= »back-home-button »>
            العودة
          </button>
        </div>
      ) : (
        <ControlPanel />
      )}
    </div>
  ) ;
}

Export default Admin ;

        </div>
      ) : (
        <GameRoom roomId={roomId} playerName={playerName} />
      )}
    </div>
  ) ;
}

Export default Room ;
