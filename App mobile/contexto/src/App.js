import Rotas from './routes'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Contexts/Contexts';


function App() {
  return (
    <div>
      <AuthProvider>
        <Rotas />
        <ToastContainer
          autoClose={5000}
        />
      </AuthProvider>
    </div>
  );
}

export default App;
