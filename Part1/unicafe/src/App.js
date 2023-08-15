import { useState } from 'react'

const StatisticLine = (props) => (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  ) 

const Statistics = (props) => {
  const total = ( props.good + props.neutral + props.bad )
  const average = ( (props.good + ( props.neutral * 0 ) + (props.bad * -1) ) / total )
  const positive = ( ( props.good / total ) * 100 )

  if (total != 0) {
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>
              <StatisticLine text="good" />
            </td>
            <td>
              <StatisticLine value ={props.good} />
            </td>
          </tr>
          <tr>
            <td>
             <StatisticLine text="neutral" />
            </td>
            <td>
              <StatisticLine value ={props.neutral} />
            </td>
         </tr>
          <tr>
            <td>
              <StatisticLine text="bad" />
            </td>
            <td>
              <StatisticLine value ={props.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="total" />
            </td>
            <td>
              <StatisticLine value ={total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average" />
            </td>
            <td>
              <StatisticLine value ={average} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive" />
            </td>
            <td>
              <StatisticLine value ={positive} />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App