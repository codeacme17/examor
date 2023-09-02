</br>

<p>
  <img  width="240"  src="/docs/logo-text.png" />
</p>

<p>
  <a href="https://github.com/codeacme17/examor/blob/main/docs/zh-doc.md">
    <img height="21" src="https://img.shields.io/badge/中文文档-7d09f1?style=flat-square" alt="zh-cn">
  </a>
  <a href="https://github.com/codeacme17/examor/blob/main/docs/ROADMAP.md">
    <img height="21" src="https://img.shields.io/badge/ROADMAP-7d09f1?style=flat-square" alt="roadmap">
  </a>
  <a href="https://www.reddit.com/r/examor/">
    <img height="21" src="https://img.shields.io/badge/Reddit-%23fff?style=flat-square&logo=reddit&logoColor=7d09f1" alt="reddit">
  </a>
  <a href="https://www.producthunt.com/posts/examor?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-examor">
    <img height="21" src="https://img.shields.io/badge/Product%20Hunt-fff?style=flat-square&logo=producthunt&logoColor=7d09f1" alt="producthunt">
  </a>
  <a href="https://github.com/codeacme17/examor/blob/main/LICENSE">
    <img height="21" src="https://img.shields.io/badge/License-AGPL--3.0-ffffff?style=flat-square&labelColor=fff&color=7d09f1" alt="license">
  </a>
</p>

<p>
  <strong>
   A website application that allows you to take exams based on your knowledge notes. Let you really remember what you have learned and written 🧠.
  </strong>
</p>
</br>
<img src = "https://github.com/codeacme17/examor/blob/main/docs/product.png?raw=true"></img>

## 🗒️ Dev-plan for this week（9/1 - 9/8）
- After a little precipitation, refactor the code of the project as a whole to improve code readability and extensibility
- Complete the development of fill-in-the-blank questions

## 💡 Inspiration

> For learners, one of the best habits should be regular self-testing - **Make It Stick: The Science of Successful Learning**

When I'm learning a new technology, I have the habit of taking notes and jotting down important information. It's a good habit, but I also have a bad habit of not enjoying reading the notes I've written (I'm not sure if this is the case for most people 🤔). This results in my notes becoming mere mementos without substantial use. That's why I choose to create an application that continuously prompts you with questions to review your note contents.

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

Open `http://localhost:51818` in your browser to access Examor. (Due to optimization scheme for modules, it may be slow when loading the program or entering a certain page for the first time)

## ✨ Features

### Generate Issues from Documentation

When users create notes, they can upload associated documents. The application generates a set of questions from these documents, based on their content. These questions will be presented to the users in the future.When creating notes, users can choose the types of questions they want to generate, providing them with a richer learning experience.

### Answer Detection

After users receive daily questions, they can provide answers. GPT will score, validate, and provide the correct answers. The score is determined by evaluating the correctness of the answers and the linked document (0 ~ 10 points). This score influences the subsequent Ebbinghaus review process.

### Ebbinghaus Memory

> I've implemented a simplified version of Ebbinghaus memory, currently consisting of only 8 lines of code. I plan to optimize this function further in the future (v0.1).

Regarding the actual function, once GPT generates a test, the score is recorded and affects the future review date. Higher scores result in longer intervals until the next review.

### Role Selection

> ⚠️ The feature in the current version might not be entirely stable. In the upcoming plans, I will continue to optimize this feature (v0.1).

<img width="500" src="/docs/screen-shot/en-role.png" />

Roles can provide more possibilities for question generation and assessment. You can set roles in the configuration page. For more information about various roles, it's recommended to refer to the [Role Manual](/docs/en-role.md).

### Question Type Selection

> The current version (v0.2.1) supports generating single-choice questions, and fill-in-the-blank questions will be added in future updates.

- Choose the question type when creating notes.

  <img  width="400"  src="/docs/screen-shot/en-question-type.png" />

- When practicing questions, you can answer using different methods. The image below shows an example of a single-choice question.

  <img  width="700"  src="/docs/screen-shot/en-question-type-answer.png" />

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

## ♻️ Update the Project

> **Warning**
> When upgrading to version v0.2.1, you may encounter an error when importing profile configurations. This is because I have modified the `proxy` key in the table [#19](https://github.com/codeacme17/examor/pull/19).
> 
> You can change the column name `proxy` to `openai_proxy` in the `t_profile` sheet of the Excel file.
> 
> I sincerely apologize for any inconvenience this may have caused in using the software. In the future, I will avoid directly changing key names in the library!

When starting the project, the application checks for updates. If an update is required, the user will be notified. You can follow these steps to update:

1. Export your notes, questions, or configuration items as a backup through the **Export Configuration and Notes** button on the personal settings page. This will export a file named `examor-data.xlsx`. You can view the file contents, **but it's not recommended to modify the file content**

   <img width="700" src="/docs/screen-shot/en-export-import.png" />

3. Pull the latest remote code updates to refresh your local project.

4. Delete the existing Docker container and rebuild the project with the `docker-compose run` command to incorporate the latest changes.

5. Once the build is successful, navigate to the personal settings page, click the **Import File** button, and re-import the backed-up data into the project.

> The current updating process is based on my personal usage. It might not be the best way to update. If you have better update methods, please feel free to provide assistance in the issues section ❤️

## Contributing

**Since the project is in a very early stage, there are still many problems and bugs in the project.** If you find a bug or have an idea for a new feature, please submit an issue or pull request. See more in [CONTRIBUTING](/CONTRIBUTING.md).

## License

[AGPL-3.0 license](/LICENSE) © 2023-Present [leyoonafr](https://github.com/codeacme17)
