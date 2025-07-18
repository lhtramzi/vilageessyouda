// frontend/src/__tests__/GameRoom.test.jsx
Import { render, screen } from « @testing-library/react » ;
Import GameRoom from « ../components/GameRoom » ;
Import { SocketContext } from « ../services/socket » ;
Import { ThemeProvider } from « ../contexts/ThemeContext » ;
Import { BrowserRouter } from « react-router-dom » ;

Const mockSocket = {
  On : jest.fn(),
  Emit : jest.fn(),
  Off : jest.fn(),
} ;

Test(« renders GameRoom component », () => {
  Render(
    <SocketContext.Provider value={mockSocket}>
      <ThemeProvider>
        <BrowserRouter>
          <GameRoom />
        </BrowserRouter>
      </ThemeProvider>
    </SocketContext.Provider>
  ) ;

  Const title = screen.getByText(/قائمة اللاعبين/i) ;
  Expect(title).toBeInTheDocument() ;
}) ;
