import { getRandomFact } from './services/facts'
import './App.css'
import { useEffect, useState } from 'react'
import { useCatImage } from './hooks/useCatImage'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_RANDOM_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`

const useCatFact = () =>{
  // Min: 24:40 de Pt4 del curso
}

export function App () {
  const [fact, setFact] = useState()
  const {imageUrl} = useCatImage({fact})
  

  //Efecto para recuperar la frase al cargar la pagina
  useEffect(()=>{
    getRandomFact().then(newFact => setFact(newFact))
  },[])


  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }
  return (
    <main>
      <h1>Holis</h1>
      <button onClick={handleClick}>Obtener nueva frase</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt='Imagen aleatoria de un gato jeje'/>}
      </section>
    </main>
  )
}
