import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import styled from 'styled-components'

const CardWrapper = styled.main`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`

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

  const renderQuestions = () => (
    <CardWrapper>
      {data.map(({ id, question, answer }: QuestionAnswerSet) => {
        return <Card key={id} frontText={question} backText={answer} />
      })}
    </CardWrapper>
  )

  return <div>{!isLoading && renderQuestions()}</div>
}
