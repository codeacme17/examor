<samp>
</br>
</br>

<p>
  <img  width="200"  src="/docs/logo-text.png" />
</p>

<p>
  <strong>
   A website application that allows you to take exams based on your knowledge notes. Let you really remember the notes you wrote
  </strong>
</p>

<p>
  <a href="https://github.com/codeacme17/examor/blob/main/docs/cn-doc.md">
    <img height="21" src="https://img.shields.io/badge/zh--CN-7d09f1?style=flat-square" alt="zh-cn">
  </a>
  <a href="https://github.com/codeacme17/examor/blob/main/docs/ROADMAP.md">
    <img height="21" src="https://img.shields.io/badge/ROADMAP-7d09f1?style=flat-square" alt="roadmap">
  </a>
  <a href="https://discordapp.com/channels/974519864045756446/1138743595097149450">
    <img height="21" src="https://img.shields.io/badge/Chat%20Room-7d09f1?style=flat-square&logo=discord&logoColor=7d09f1&labelColor=fff&color=fff" alt="discord">
  </a>
  <a href="https://www.producthunt.com/posts/examor?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-examor">
    <img height="21" src="https://img.shields.io/badge/Product%20Hunt-fff?style=flat-square&logo=producthunt&logoColor=7d09f1" alt="producthunt">
  </a>
  <a href="https://github.com/codeacme17/examor/blob/main/LICENSE">
    <img height="21" src="https://img.shields.io/badge/License-AGPL--3.0-ffffff?style=flat-square&labelColor=fff&color=7d09f1" alt="license">
  </a>
</p>
</samp>

</br>
<img width="870" src = "https://github.com/codeacme17/examor/blob/main/docs/product.png?raw=true"></img>
</br>

## 💡 Inspiration

> 'For learners, one of the best habits should be regular self-testing' - **Make It Stick: The Science of Successful Learning**

When I'm learning a new technology, I have the habit of taking notes and jotting down important information. It's a good habit, but I also have a bad habit of not enjoying reading the notes I've written (I'm not sure if this is the case for most people 🫣). This results in my notes becoming mere mementos without substantial use. That's why I choose to create an application that continuously prompts you with questions to review your note contents.

## 🏁 Start

#### Clone this repo

```bash
git clone https://github.com/codeacme17/examor.git
cd examor
```

#### Run docker compose

```bash
docker-compose up
```

> Please make sure Docker is installed on your local machine, and ports `51717`, `51818`, and `52020` are available on your local host

Open `http://localhost:51818` in your browser to access Examor.

## ✨ Features

This project primarily focuses on question generation and answer detection based on user documentation. In the initial version, I've implemented a simplified version of the Ebbinghaus memory curve, which allows periodic reviews based on the accuracy of your answers.

### Generate Issues from Documentation

When users create notes, they can upload associated documents. The application generates a set of questions from these documents, based on their content. These questions will be presented to the users in the future.

### Answer Detection

After users receive daily questions, they can provide answers. GPT will score, validate, and provide the correct answers. The score is determined by evaluating the correctness of the answers and the linked document (0 ~ 10 points). This score influences the subsequent Ebbinghaus review process.

### Ebbinghaus Memory

> I've implemented a simplified version of Ebbinghaus memory, currently consisting of only 8 lines of code. I plan to optimize this function further in the future.

Regarding the actual function, once GPT generates a test, the score is recorded and affects the future review date. Higher scores result in longer intervals until the next review.

## 📦️ Modules

### Notes Management

`Notes Management` is a module to oversee all uploaded documents. Within this module, you can delete or add new files to your uploaded notes. Note that deleting all documents under a note will clear the associated questions.

### Random Question

`Random Question` is a module that randomly selects a question from the existing question bank. Implementation of this module enables this feature.

### Note

`Note` is a virtual module generated in your app for each note you create. In this module, you can answer questions. Question pushing is implemented according to the Ebbinghaus memory curve. You will receive three types of question data:

- Questions for Today's Review: As the name suggests, this data pertains to questions that need review on the current day for questions answered in the past.

- Expired Questions: These are questions not completed within the required review timeframe on the same day, resulting in this data being collected.

- New Questions: When the user-defined daily question count is not met from the above two data sets, this supplementary data set is pushed to the user.

### Examine

`Examine` is a central module where users answer questions, allowing GPT to score and validate answers. The module comprises three components:

- Answer: Users enter their answers, and test content can be displayed after submission.

- Last Record: Records the user's previous answer to the question and the detection outcome.

- Document Content: This component displays the actual uploaded document content, serving as the basis and final answer for the question.

</br>

## Contributing

Contributions to the project are welcome! If you find a bug or have an idea for a new feature, please submit an issue or pull request.

## License

[AGPL-3.0 license](/LICENSE) © 2023-Present [leyoonafr](https://github.com/codeacme17)
