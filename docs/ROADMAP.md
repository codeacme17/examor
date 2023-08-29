# Roadmap

## v0.3.0 - 70% Progress

### Features

- [ ] Support more document types
  - [ ] `.docs`
  - [ ] `.pdf`
  - [ ] notionDB
- [ ] Generate more question types
  - [ ] multiple choice
  - [ ] fill in the blanks
- [ ] Allow users to select question types when uploading docs
- [ ] Add detection modules for different question types
- [ ] Add more model options
- [ ] Set up local proxy in Docker containers
- [x] Added data import and export features to back up data
- [x] Provide identity selection, allowing users to set the identity of teachers, examiners, interviewers, etc. that affect the strictness of detection and the divergence of generated questions

  | Role        | Divergence | Strictness |
  | ----------- | ---------- | ---------- |
  | Teacher     | ⭐️⭐️     | 😏         |
  | Interviewer | ⭐️⭐️⭐️  | 😐         |
  | Examiner    | ⭐️        | 😭         |
- [ ] Dashboard page

### Optimizations

- [ ] Optimize prompt templates for question generation
- [ ] Optimize prompt templates for examine
- [ ] Optimize Ebbinghaus algorithm
- [x] Improve error messages
