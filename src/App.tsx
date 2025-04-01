import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserData from "./Usersdata";
import CreatePage from "./Createpage";
import Singlepersondetails from "./Singlepersondetails";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import LoginPage from "./components/LoginPage";
import EditUser from "./components/UserEdit";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<UserData />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/user/:id" element={<Singlepersondetails />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
