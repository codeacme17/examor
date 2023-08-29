export const en = {
  slogan: 'self-improvement',

  menus: {
    dashboard: 'Dashboard',
    notes: 'Notes',
    random: 'Random Pick',
    addNote: 'add note',
  },

  button: {
    submit: 'submit',
    continue: 'continue',
    upload: 'upload',
    update: 'update',
    addFile: 'add new file',
    deleteNote: 'delete this note',
    confirmDelete: 'confirm delete',
    finished: 'finished',
    role: 'Role Manual',
    teacher: 'Teacher',
    interviewer: 'Interviewer',
    examiner: 'Examiner',
    export: 'Export configuration and notes',
    import: 'Import file',
  },

  // the title & subtitle on each page
  title: {
    profile: 'Profile',
    notes: 'Notes',
    addNote: 'Add Note',
    question: 'Question',
    random: 'Random Pick',
    emptyNote: 'There is no any note yet',
    emptyQuestion: 'Threre is no any questions yet',
    keys: 'Keys',
    otherConfigurations: 'Other Configurations',
    filename: 'File Name',
    uploadDate: 'Upload Date',
    createDate: 'Create Date',
    updateFile: 'Update File',
    uploadFile: 'Upload File',
    lastAnswer: 'Last Answer',
    lastExamine: 'Last Examine',
    today: 'Questions to review today',
    expired: 'Expired Questions',
    supplement: 'New Questions',
    model: 'Choose the model to use',
    totalAmount: 'Total questions',
    finishedAmount: 'Already answered',
    uploading: 'Uploading',
    role: 'Please select your desired role',
    export: 'Please select the data to export',
    import: 'Please select the file you want to upload',
  },
  subTitle: {
    notes: 'You can manage your notes here',
    profile: 'Can be configured here refer to the required options',
    addNote: 'You can add new notes here',
    emptyNoteStart: 'You can enter the',
    emptyNoteEnd: 'page to create your first note',
    changePlan:
      'The new plan will be implemented tomorrow after submitting the changes',
    role: 'Roles affect question generation and answer detection results',
    export:
      'Exporting data helps to preserve past data when updating a project (a file named examor-data.xlsx is exported)',
    import:
      'Note that when you upload a file, the previous data will be cleared and the data in the file will be used.(only ".xlsx" allowed)',
  },

  // label of input field
  label: {
    noteName: 'Note Name',
    namespace: 'namespace',
    selectNoteType: 'Note Type',
    notionDataBaseID: 'Notion Database ID',
    answer: 'Answer',
    lastRecord: 'last record',
    document: 'Note Content',
    examine: 'Examine',
    proxy: 'Proxy',
    isProfile: 'user profile data',
    isNotes: 'all notes, questions and answers',
  },

  // placeholder of input field
  placeholder: {
    selectNoteType: 'please select a note type',
    answer: "please answer here (press 'ctrl' + 'enter' to send)",
    inputFile: 'select a file',
  },

  // option label on select component
  option: {
    localFiles: 'Local Files',
    notion: 'Notion DB',
  },

  hint: {
    openAIBilling: 'OpenAI billing',
    files: 'File(s)',
    memory: 'Memory Progress',
    questionCounts:
      'Please select how many questions are prepared for you each day',
    getIcon: 'To get the icon please go to',
    proxy:
      'If you need a VPN to access OpenAI then please fill in your proxy address (use "http" protocol)',
    lastRecord: 'No reord yet',
  },

  errorHint: {
    noteName: 'note name is required',
    namespace: 'namespace is required',
  },

  message: {
    successAddNote: 'Note add successfully',
    notionKeyStart: 'Please bind the',
    notionKeyEnd: 'before uploading',
    switchLang:
      'Note that switching languages affects the language in which GPT generates questions and detects',
    OpenAIKeyError: 'Please configure the API key of OpenAI',
    AzureKeyError: 'Please configure the configuration items required by Azure',
    timeout:
      'The current request has timed out, which could be due to a network issue. Please check your proxy settings or try debugging using an alternative method.',
    successImport: 'Import file succeeded',
    needUpdate:
      'It is detected that the project needs to be updated, please go to view the update guide',
  },
}
