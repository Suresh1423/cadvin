import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import RegistrationForm from './Components/Registration/RegistrationForm'
import Layout from './Components/Layout'
import Home from './Components/Home/Home'
import { Toaster } from 'react-hot-toast'
import Instruction from './Components/Instructions/Instruction'
import Questions from './Components/TestQuestions/Questions'
import Results from './Components/Results/Results'
import NotFound from './Components/Utils/NotFound'
import RuleViolationModal from './Components/Utils/RuleViolationModal'

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right"  reverseOrder={false} />
        <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route element={<Layout/>}>
          <Route path='/instructions'  element={<Instruction/>}/>
          <Route path='/test'  element={<Questions/>}/>
          <Route path='/results'  element={<Results/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
