const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = (props) => {
  const Header = (props) => (
    <div>
    <h1>
      {props.course.course.name}
    </h1>
    </div>
  )
  
  const Content = (props) => (
    <div>
      {props.course.course.parts.map(part => 
        <p key={part.id} >
          {part.name} {part.exercises}
        </p>
      )}
    </div>
  )

  const Total = (parts) => {
    const sum = parts.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0,
    )
    return (
      <b>total of {sum} exercises</b>
    )
  }
  
  return (
    <div>
      <Header course={props} />
      <Content course={props} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
} 

export default App