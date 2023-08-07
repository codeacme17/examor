<samp>
</br>
</br>

<p>
  <img  width="190"  src="/docs/logo-text.png" />
</p>

<p>
  <strong>
   A website application that allows you to take exams based on your knowledge notes
  </strong>
</p>

<p>
  English | <a href="/docs/cn-doc.md">简写中文</a>
</p>

</br>

## Inspiration

> 'For learners, one of the best habits should be regular self-testing' - **Make It Stick: The Science of Successful Learning**

When I'm learning a new technology, I have the habit of taking notes and jotting down important information. It's a good habit, but I also have a bad habit of not enjoying reading the notes I've written (I'm not sure if this is the case for most people 🫣). This results in my notes becoming mere mementos without substantial use. That's why I choose to create an application that continuously prompts you with questions to review your note contents.

</br>

## Features

The project is primarily a question generation and answer detection based on the user's documentation, and in the initial version, I implemented a beggar's version of Ebbinghaus memory curve that can be periodically reviewed based on how accurately you answered the question

#### Generate issues based on documentation

When the user creates notes, they need to upload documents at the same time, and the application will generate a certain number of questions from these documents, which are generated based on the content of the document, and these questions will be pushed to the user in the future

#### Detect based on answers

After the user gets the question of the day, the user can answer the question, where GPT will score, correct and give the correct answer to the user's answer. The score is based on the evaluation of the correctness of the answer and the transmitted document (0 ~ 10 points), and this score will affect the subsequent Ebbinghaus record

#### Ebbinghaus Memory

I implemented a beggar's version of Ebbinghaus, which currently only has 8 lines of code, and I will optimize this function in the future. Talking about the actual function, after GPT generates the test, I will record the score value in the test, and affect the date of future review by the level of the score, that is, the higher the score, the farther the date of the next review

</br>

## Module

#### Notes Management

**Notes Management** is a module to manage all the documents you have uploaded, in this gate block you can delete or add new files to your uploaded notes, of course, if you delete all documents under a note, the problem will be cleared

#### Random Question

**Random Question** is a module that randomly draws a question from an existing question bank, and can be implemented in this module

#### Note

A note is an abstract module that generates a note module in your app for each note you create, where you can answer the questions in that note. And the push of questions is implemented according to the Ebbinghaus memory curve, for example, you will receive three types of problem data:

- Questions to review today: As the name suggests, this is the data of questions that need to be reviewed on the day for questions that have been answered in the past

- Expired questions: This is due to not completing the questions that need to be reviewed on time on the same day, so this question data will be collected

- New questions: When the number of daily questions defined by the user is not met in the above two data sets, this data set will be pushed to the user as a supplement to the questions

#### Examine

**Examine** is the most central module in which users can answer questions, allowing GPT to score and test the answers. There are three components in the module:

- Answer: The user enters the answer, and the content of the test can be displayed after submission

- Last Record: Record the user's last answer to the question and the content of the detection

- Document content: This component will display the actual uploaded document content of the user, that is, the basis and final answer to this question

</br>

## Contributing

Contributions to the project are welcome! If you find a bug or have an idea for a new feature, please submit an issue or pull request.

## License

[MIT](/LICENSE) License © 2023-Present [leyoonafr](https://github.com/codeacme17)

</samp>
