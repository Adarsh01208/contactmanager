
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddContact from './components/AddContact';
import ViewContact from './components/ViewContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';





function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route>

         
            <Route path="*" element={<Navigate to="/contactlist" />} />
            <Route path="/contactlist" element={<ContactList/>} />
            <Route path="/addcontact" element={<AddContact/>} />
            <Route path="/viewcontact/:id" element={<ViewContact/>} />
            <Route path="/editcontact/:id" element={<EditContact/>} />
            


          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
