import UserWrapper from "./components/User/UserWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from './redux/Store';
import AdminWrapper from './components/Admin/AdminWrapper'

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserWrapper />} />
          <Route path="admin/*" element={<AdminWrapper />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
