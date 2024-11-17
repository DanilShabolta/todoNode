import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import TaskManager from './components/TaskManager';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskManager />
  </StrictMode>,
)
