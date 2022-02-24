import { useState, useEffect } from 'react'

interface QuestionAnswerSet {
  id: string
  question: string
  answer: string
}

const fetchData = async () => {
  const response = await fetch('/notion_data')
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body
}

export const App = () => {
  const [data, setData] = useState<QuestionAnswerSet[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(data)

  useEffect(() => {
    setIsLoading(true)
    fetchData()
      .then((res) => setData(res.express))
      .catch((err) => console.log(err))
    setIsLoading(false)
  }, [])

  const renderQuestions = () => {
    return (
      <ul>
        {data.map(({ id, question, answer }: QuestionAnswerSet) => {
          return (
            <li key={id}>
              {question}
              <small>{answer}</small>
            </li>
          )
        })}
      </ul>
    )
  }

  return <div>{!isLoading && renderQuestions()}</div>
}
