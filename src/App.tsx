import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import styled from 'styled-components'

const Container = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
  padding: 30px 0;
`
const CardWrapper = styled.section`
  display: grid;
  gap: 20px;
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 550px) and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  console.log(data)

  useEffect(() => {
    setIsLoading(true)
    fetchData()
      .then((res) => setData(res.express))
      .catch((err) => console.log(err))
    setIsLoading(false)
  }, [])

  const renderQuestions = () => {
    if (data.length === 0) {
      return 'Add questions and answers to your Notion page!'
    }

    return (
      <CardWrapper>
        {data.map(({ id, question, answer }: QuestionAnswerSet) => {
          return <Card key={id} frontText={question} backText={answer} />
        })}
      </CardWrapper>
    )
  }

  return <Container>{isLoading ? 'Loading...' : renderQuestions()}</Container>
}
