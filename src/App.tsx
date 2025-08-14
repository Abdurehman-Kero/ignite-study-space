import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Upload from './pages/Upload';
import AITools from './pages/AITools';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="notes" element={<Notes />} />
          <Route path="upload" element={<Upload />} />
          <Route path="ai-tools" element={<AITools />} />
          <Route path="chat" element={<Chat />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;