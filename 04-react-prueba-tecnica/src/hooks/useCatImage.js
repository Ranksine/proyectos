import { useState, useEffect } from "react"

export function useCatImage ({ fact }){
  const [imageUrl, setImageUrl] = useState()
   // Efecto para recuperar la imagen cada vez que se tenga una frase
  useEffect(()=>{
    if(!fact) return
      const firstWord = fact.split(' ',3).join(' ')
      console.log("Primera palabra: ", firstWord)

      fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then(res=>res.json())
      .then(response=>{
        const {url} = response
        setImageUrl(url)
      })
  },[fact])

  return {imageUrl}
}