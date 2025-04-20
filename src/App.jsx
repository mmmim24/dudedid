import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import TaskProvider from './store/taskStore'
import AuthProvider from './store/authStore'

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <Header />
          <Home />
        </TaskProvider>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
