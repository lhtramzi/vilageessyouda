// frontend/src/__tests__/App.test.jsx
Import { render, screen } from « @testing-library/react » ;
Import App from « ../App » ;
Import { BrowserRouter } from « react-router-dom » ;

Test(« renders main app component », () => {
  Render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) ;
  Const linkElement = screen.getByText(/فيلاج الصيودة/i) ;
  Expect(linkElement).toBeInTheDocument() ;
}) ;