// frontend/src/App.jsx
Import React, { useContext } from « react » ;
Import { ThemeContext } from « ./contexts/ThemeContext » ;
Import AppRouter from « ./routes/AppRouter » ;
Import « ./styles/variables.css » ;
Import « ./index.css » ;

Function App() {
  Const { theme } = useContext(ThemeContext) ;

  Return (
    <div className={`app-container ${theme}`}>
      <AppRouter />
    </div>
  ) ;
}

Export default App ;
