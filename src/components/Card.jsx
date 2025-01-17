import React from 'react'

const Card = ({selectedCharacter, characters, handleCharacter}) => {
  return (
    <div>
        {selectedCharacter ? (
                <div className='text-dark text-xl flex flex-col items-center mt-8 border border-dark rounded border shadow-md'>
                    <div className='p-4 font-bold text-3xl'>{selectedCharacter.name}</div>
                    <div className='p-4'><span className='font-bold'>Planet:</span> {selectedCharacter.homeworld}</div>
                    <div className='p-4'><span className='font-bold flex justify-center underline'>Films</span> {selectedCharacter.films.length > 0 ? (
                            selectedCharacter.films.map((film) => <li className='list-none flex justify-center' key={film}>{film}</li>)
                        ) : (
                            <li className='list-none flex justify-center'>no films</li>
                        )}
                    </div>
                </div>
            ) : (
                <div className='mt-8 flex flex-col items-center'>
                {characters.length > 0 && (
                  <ul>
                    {characters.map((character) => (
                      <li className='cursor-pointer text-dark text-xl p-4 hover:scale-110 transform transition duration-300' key={character.name} onClick={() => handleCharacter(character)}>
                        <p >{character.name}</p>
                      </li>
                    ))}
                  </ul>
                )} 
              </div>
            )
        }
    </div>
  )
}

export default Card