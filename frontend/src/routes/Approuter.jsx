// frontend/src/routes/AppRouter.jsx
Import React from « react » ;
Import { BrowserRouter as Router, Routes, Route } from « react-router-dom » ;
Import Home from « ../pages/Home » ;
Import Room from « ../pages/Room » ;
Import Admin from « ../pages/Admin » ;

Function AppRouter() {
  Return (
    <Router>
      <Routes>
        <Route path= »/ » element={<Home />} />
        <Route path= »/room/ :roomId » element={<Room />} />
        <Route path= »/admin » element={<Admin />} />
      </Routes>
    </Router>
  ) ;
}

Export default AppRouter ;
