import { useState } from 'react'

const Button = (props) => ( //creates a button, takes text and handleClick
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function getRandomInt(max) { //allows us to get random integer
  return (
    (Math.floor(Math.random() * max))
  )
}

const Votes = (props) => ( //displays vote counter for current anecdote
    <div>
      <p>has {props.value[props.position]} votes</p>
    </div>
  )

const MostVotes = (props) => { //displays highest voted anecdote and number of votes it has
  const newUpdatedVotes = props.value
  const highestValue = Math.max(...newUpdatedVotes)
  const index = newUpdatedVotes.indexOf(highestValue)
  return(
    <div>
      <p>{props.position[index]}</p>
      <p>has {highestValue} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0)) //state as new array

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const handleRandomAnecdote = () => { //chooses a random anecdote
    setSelected(getRandomInt(anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Votes value={votes} position={selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleRandomAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVotes value={votes} position={anecdotes} />
    </div>
  )
}

export default App
