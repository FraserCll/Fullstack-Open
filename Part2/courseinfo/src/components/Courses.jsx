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

    export default Courses