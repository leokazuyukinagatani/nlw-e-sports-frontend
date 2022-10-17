import { useEffect, useState } from 'react'
import { CreateAdBanner } from '../components/CreateAdBanner'
import { GameBanner } from '../components/GameBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '../services/api'
import '../styles/main.css'

import { CreateAdModal } from '../components/CreateAdModal'

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
      ads: number;
  };
}

export function Home() {

  const [games, setGames] = useState<Game[]>([])
  useEffect(() =>{
      api.get(`/games`)
        .then(response => setGames(response.data))
  },[])
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src='/assets/logo.png' alt='' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>

       {
        games && games.map((game:Game) => (
          <GameBanner key={game.id} title={game.title} bannerUrl={game.bannerUrl} adsCount={game._count.ads} />
        ))
       }

      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    
    </div>
    )
}

