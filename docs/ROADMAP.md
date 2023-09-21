# Roadmap

> [!IMPORTANT]
> v0.5.0 - 85% Progress

### Features

- [ ] Dashboard page
- [ ] Support PWA
- [ ] Support more document types
  - [ ] `.docs`
  - [ ] `.pdf`
  - [ ] notionDB
- [x] Generate more question types
  - [x] single choice
  - [x] fill in the blanks
- [ ] Add more model options
  - [x] gpt-4 (openai)
  - [ ] claude-2 (anthropic)
- [x] Allow users to select question types when uploading docs
- [x] Add detection modules for different question types
- [x] Added data import and export features to back up data
- [x] Provide identity selection, allowing users to set the identity of teachers, examiners, interviewers, etc. that affect the strictness of detection and the divergence of generated questions

  | Role        | Divergence | Strictness |
  | ----------- | ---------- | ---------- |
  | Teacher     | ⭐️⭐️     | 😏         |
  | Interviewer | ⭐️⭐️⭐️  | 😐         |
  | Examiner    | ⭐️        | 😭         |
- [ ] Custom prompt: A module that allows users to set their own question-generation prompts, customize roles, and question types.

### Optimizations

- [ ] Optimize prompt templates for question generation
- [ ] Optimize prompt templates for examine
- [ ] Optimize Ebbinghaus algorithm
- [x] Improve error messages
