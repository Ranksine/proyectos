import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'ranksine',
    name: 'Omy Aguilar',
    isFollowing: false
  },
  {
    userName: 'Julio Arriaga',
    name: 'juliocam01',
    isFollowing: true
  }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName} // Debe ser unico, para listas originarias de la DB, usar su ID
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}