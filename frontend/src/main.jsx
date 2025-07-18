// frontend/src/main.jsx
Import React from « react » ;
Import ReactDOM from « react-dom/client » ;
Import App from « ./App.jsx » ;
Import « ./index.css » ;
Import { ThemeProvider } from « ./contexts/ThemeContext.jsx » ;

ReactDOM.createRoot(document.getElementById(« root »)).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
) ;
