import { useState } from 'react'

const Title = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.text === "positive" ? "%" : ""}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <StatisticsLine text="good" value={props.good}></StatisticsLine>
          <StatisticsLine text="neutral" value={props.neutral}></StatisticsLine>
          <StatisticsLine text="bad" value={props.bad}></StatisticsLine>
          <StatisticsLine text="all" value={props.all}></StatisticsLine>
          <StatisticsLine text="average" value={props.average}></StatisticsLine>
          <StatisticsLine text="positive" value={props.positive}></StatisticsLine>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setALl] = useState(0)

  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const positive = (good * 100) / all

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
    setALl(updateGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setALl(good + updateNeutral + bad)
  }

  const handleBadClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    setALl(good + neutral + updateBad)
  }

  return (
    <div>
      <Title title="give feedback"></Title>
      <Button onClick={handleGoodClick} text={"Good"}></Button>
      <Button onClick={handleNeutralClick} text={"Neutral"}></Button>
      <Button onClick={handleBadClick} text={"Bad"}></Button>

      <Title title="statistics"></Title>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  )
}

export default App