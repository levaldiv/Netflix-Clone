import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DocumentData } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  // when using firebas
  movies: Movie[] | DocumentData[]
}

function Row({ title, movies }: Props) {
  // keeping trrack of the sidescrolling
  const rowRef = useRef<HTMLDivElement>(null)
  // this will keep track of the arrow and will not show when the row is at the end
  const [isMoved, setIsMoved] = useState(false)

  // creating a function to move the arrow depending on where the user clicks (left or right)
  const handleClick = (direction: string) => {
    setIsMoved(true)

    // get current obj from the ref
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      // cheching the direction
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      //   this will have smooth scrolling
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      {/* Movie title */}
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      {/* left & right icons */}
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`leftArrow ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        />

        {/* Rendering all the movies here */}
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {/* mapping through movies array */}
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`rightArrow`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
