// This script deletes all notes from the database. Only for development purposes.

import { PrismaClient } from '@prisma/client'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function confirm(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close()
      resolve(input.toLowerCase() === 'y')
    })
  })
}

async function main() {
  const isConfirmed = await confirm(
    'Are you sure you want to delete all notes? (y/N) '
  )

  if (isConfirmed) {
    await prisma.tQuestion.deleteMany()
    await prisma.tFile.deleteMany()
    await prisma.tDocument.deleteMany()
    await prisma.tNote.deleteMany()
    console.log('All notes have been deleted.')
  } else {
    console.log('Operation cancelled.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
