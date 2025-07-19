import './App.css';

import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import NavBar from './Componentes/NavBar';
import Form from './Componentes/Form';

// Pages
import Notas from './Pages/Notas/Notas';
import Favoritos from './Pages/Favoritos/Favorito';
import Lixeira from './Pages/Lixeira/Lixeira';
import Cadastrar from './Pages/Cadastrar/Cadastrar';
import EditeNota from './Pages/EditeNota/EditeNota';

// Contextos
import { ContextQProvider } from './Context/ContexQ';
import { ContextProvider } from './Context/ContextNotes';

// Componente separado que usa useLocation
function Content() {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {!pathname.includes('/cadastrar') && (
        <div className="topo">
          <p>
            {pathname.replace('/', '') == ''
              ? 'Notas'
              : `${pathname.replace('/', '')}`}
          </p>
          <Form />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Notas />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/lixeira" element={<Lixeira />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/edite-note/:id" element={<EditeNota />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <ContextQProvider>
        <ContextProvider>
          <NavBar />
          <Content />
        </ContextProvider>
      </ContextQProvider>
    </HashRouter>
  );
}

export default App;
