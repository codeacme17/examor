export const zhCN = {
  slogan: 'self-improvement',

  menus: {
    dashboard: '控制面板',
    notes: '笔记管理',
    random: '随机选题',
    addNote: '新增笔记',
    questionBank: '题库',
  },

  button: {
    submit: '提交',
    continue: '继续作答',
    upload: '上传',
    update: '更新',
    addFile: '新增文件',
    deleteNote: '删除该笔记',
    confirmDelete: '确认删除',
    finished: '已完成',
    role: '角色手册',
    teacher: '教师',
    interviewer: '面试官',
    examiner: '考官',
    export: '导出配置及笔记',
    import: '文件导入',
    short: '简答题',
    choice: '单选题',
    blank: '填空题',
  },

  title: {
    profile: '个人配置',
    notes: '笔记管理',
    addNote: '新增笔记',
    question: '问题',
    random: '随机选题',
    emptyNote: '暂无任何笔记',
    emptyQuestion: '暂无任何问题',
    keys: '密钥',
    otherConfigurations: '其他配置',
    filename: '文件名',
    uploadDate: '上传日期',
    createDate: '创建日期',
    updateFile: '更新文件',
    uploadFile: '上传文件',
    questionCount: '问题数量',
    lastAnswer: '上次的回答',
    lastExamine: '上次的检测',
    today: '需要今天复习的题目',
    expired: '已过期的题目',
    supplement: '新的题目',
    model: '选择要使用的模型',
    totalAmount: '问题总数',
    finishedAmount: '已回答',
    uploading: '正在上传',
    role: '请选择角色',
    export: '请选择要导出的数据',
    import: '请选择你要上传的文件',
  },

  subTitle: {
    notes: '可以在此处管理你的笔记',
    profile: '可以在此处配置引用所需的选项',
    addNote: '可以在此处新增新的笔记',
    emptyNoteStart: '可以进入',
    emptyNoteEnd: '页面创建你的第一个笔记',
    changePlan: '提交更改后将于明日实行新的计划',
    role: '角色会影响问题的生成和答案检测的结果',
    export:
      '导出数据有助于在更新项目时可以保留以往的数据 (会导出名为 examor-data.xlsx 的文件)',
    import:
      '注意，当您上传文件后，之前的数据将被清除，并使用文件中的数据 (只允许上传 ".xlsx" 文件)',
  },

  label: {
    noteName: '笔记名称',
    namespace: '命名空间',
    selectNoteType: '笔记类型',
    notionDataBaseID: 'notion 数据库 ID',
    answer: '回答',
    lastRecord: '上次的记录',
    document: '笔记内容',
    examine: '检测',
    isProfile: '用户配置数据',
    isNotes: '所有笔记内容及问题、答案',
  },

  placeholder: {
    selectNoteType: '请选择笔记类型',
    answer: "请在此处作答（按下 'ctrl' + 'enter' 进行提交）",
    inputFile: '选择一个文件',
  },

  option: {
    localFiles: '本地文件',
    notion: 'Notion 数据库',
  },

  hint: {
    openAIBilling: 'OpenAI 使用额度',
    files: '文件',
    memory: '记忆进度',
    questionCounts: '请选择每天为你准备多少个问题',
    getIcon: '获取 icon 请到',
    openaiBase: '该参数用于设置OpenAI API的基础地址',
    openaiProxy: '该参数用于设置OpenAI API的代理地址',
    lastRecord: '暂无记录',
    noneFile: '该笔记下暂无任何文件',
  },

  errorHint: {
    noteName: '笔记名称不可为空',
    namespace: '命名空间不可为空',
  },

  message: {
    successAddNote: '笔记新增成功',
    notionKeyStart: '请先绑定',
    notionKeyEnd: '再进行上传',
    switchLang: '请注意，切换语言会影响 GPT 生成问题和检测的语言',
    OpenAIKeyError: '请配置 OpenAI 的 API key',
    AzureKeyError: '请配置 Azure 所需的配置项',
    AnthropicError: '请配置 Anthropic 的 API key',
    timeout:
      '本次请求超时，这有可能是网络问题，请检查您的代理或者以其他的方式进行调试',
    successImport: '导入文件成功',
    needUpdate: '检测到需要更新项目，请前往查看更新指南',
    rateLimit:
      '检测到您目前使用的是免费账号，因为对免费账号的请求限制本次上传时间会较长，请耐心等待',
  },
}
