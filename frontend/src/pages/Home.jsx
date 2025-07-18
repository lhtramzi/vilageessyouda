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
          </button>
        </div>
      ) : (
        <GameRoom roomId={roomId} playerName={playerName} />
      )}
    </div>
  ) ;
}

Export default Room ;
