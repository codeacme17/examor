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
  },
  subTitle: {
    notes: 'You can manage your notes here',
    profile: 'Can be configured here refer to the required options',
    addNote: 'You can add new notes here',
    emptyNoteStart: 'You can enter the',
    emptyNoteEnd: 'page to create your first note',
    changePlan:
      'The new plan will be implemented tomorrow after submitting the changes',
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
  },

  // placeholder of input field
  placeholder: {
    selectNoteType: 'please select a note type',
    answer: "please answer here (press 'ctrl' + 'enter' to send)",
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
  },
}
