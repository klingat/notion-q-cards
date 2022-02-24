import { useState, ReactElement } from 'react'
import styled from 'styled-components'

interface Props {
  frontText: string
  backText: string
  className?: string
}

interface CardWrapperProps {
  showBack: boolean
}

const CardWrapper = styled.div`
  height: 200px;
  overflow: auto;
  padding: 30px;
  background: ${(props: CardWrapperProps) =>
    props.showBack ? 'white' : 'black'};
  border: 1px solid grey;
  border-radius: 8px;
  color: ${(props: CardWrapperProps) => (props.showBack ? 'black' : 'white')};
  font-size: 20px;
`

interface Props {
  frontText: string
  backText: string
  className?: string
}

export const Card = ({
  frontText,
  backText,
  className,
}: Props): ReactElement => {
  const [showBack, setShowBack] = useState<boolean>(false)

  const flipCard = () => {
    setShowBack(!showBack)
  }

  const text = showBack ? backText : frontText

  return (
    <CardWrapper className={className} onClick={flipCard} showBack={showBack}>
      {text}
    </CardWrapper>
  )
}
