import { useEffect, useState } from "react"

function App(){
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  // Pointer move
  useEffect(()=>{
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener("pointermove", handleMove)
    } // Este metodo se ejecuta cuando se destruye el componente y cuando se renderiza el componente
  }),[enabled]

  // Cambiar className de body
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return ()=>{ // El return en el useEffect se llama cleanup method
      document.body.classList.remove('no-cursor')
    }
  }), [enabled]

  return(
    <main>
    <div style={{
      position:'absolute',
      backgroundColor: '#09f',
      borderRadius:'50%',
      opacity: 0.8,
      pointerEvents:"none",
      left: -20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px,${position.y}px)`
    }}/>
      <h3>Proyecto 3</h3>
      <button onClick={()=>{setEnabled(!enabled)}}>{enabled?'Desactivar':'Activar'} seguir puntero</button>  
    </main>
  )
}

export default App