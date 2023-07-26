import { useContext } from "react";
import Home from "./pages/Home";
import "./style.scss"
import{
  BrowserRouter,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Landing from "./pages/Landing"

function App() {

  const{currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Landing/>
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
