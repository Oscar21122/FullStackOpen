const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const Header = ({course}) => {
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
        <Part key={part.id} name={part.name} exercise={part.exercises}></Part>
        )}
      </div>
    )
  }
  
  const Part = ({name, exercise}) => {
    return (
      <div>
        <p>{name} {exercise}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <div>
        <p><b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
      </div>
    )
  }

export default Course