// src/client/ClientApp.tsx
import { Routes, Route } from 'react-router-dom';
import LogIn from './Components/LogIn';
// import DataUpload from './Components/DataUpload';
import { EventView } from './Components/EventView';

function AdminApp() {
  return (
    <Routes>
      <Route path='/' element={<LogIn />} />
      <Route path='/data-upload' element={<EventView />} />
      {/* Add more client-only routes here */}
    </Routes>
  );
}

export default AdminApp;
