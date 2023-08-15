const Courses = (props) => {
  const toRender = []

  for (let course of props.courses) {
    const Course = (props) => {   
      const Header = (props) => (
          <div>
          <h2>{props.header}</h2>
          </div>
      )
      
      const Content = (props) => (
        <div>
          {props.course.parts.map(part => 
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
          <Header header={course.name} />
          <Content course={course} />
          <Total parts={course.parts} />
        </div>
      )
    }

    toRender.push(<Course key={course.id} course={course} />)
  }

  return (
    <div>
      <h1>Web development curriculum</h1>
      {toRender}
    </div>
    )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
} 

export default App