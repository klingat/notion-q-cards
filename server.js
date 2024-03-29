const { Client } = require('@notionhq/client')
const express = require('express')

require('dotenv').config()

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DB_ID = process.env.NOTION_DATABASE_ID

const app = express()

const port = process.env.PORT || 8000
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Server listening on port ${port}...`))

// initializing the Notion client
const notion = new Client({
  auth: NOTION_TOKEN,
})

// create a GET route
app.get('/notion_data', async (req, res) => {
  if (!NOTION_DB_ID || !NOTION_TOKEN) {
    console.log(process.env)
    throw Error('Must define NOTION_TOKEN and NOTION_DATABASE_ID in env')
  }

  const data = await notion.databases.query({
    database_id: NOTION_DB_ID,
  })

  let formattedList = []

  data.results.forEach((row) => {
    const id = row.id
    const questionCell = row.properties.question
    const answerCell = row.properties.answer

    const validQuestionSet =
      questionCell.type === 'title' && answerCell.type === 'rich_text'

    // only return valid rows that are question/answers
    if (validQuestionSet) {
      const question =
        (questionCell.title[0] && questionCell.title[0].plain_text) || ''
      const answer =
        (answerCell.rich_text[0] && answerCell.rich_text[0].plain_text) || ''

      const isEmptyRow = !Boolean(question) && !Boolean(answer)

      !isEmptyRow && formattedList.push({ id, question, answer })
    }
  })

  console.log(`/notion_data fetched, total items: ${formattedList.length}`)

  res.send({ express: formattedList })
})
