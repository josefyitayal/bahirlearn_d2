

async function EachCoursePage({params}) {
  const courseId = (await params).courseId
  return (
    <div>
      {courseId}
    </div>
  )
}

export default EachCoursePage
