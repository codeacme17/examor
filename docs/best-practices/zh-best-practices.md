# 文档最佳实践

## 上传文档的过程

首先先了解一下整个上传文档的过程会发生什么

<img src="./processing.png">

1. 我首先会通过 langchain 的 `RecursiveCharacterTextSplitter` 类对文档进行切块, 切分成若干个 Chunk

2. 在获得 Chunk 后, 我会对 Chunk 及逆行一系列的检测, 涉及的函数有 `is_odd_backtick_paired`, `is_there_no_enough_content`, `is_the_token_exceeded` 这些函数都可以在 [share.py](https://github.com/codeacme17/examor/blob/main/server/loaders/share.py) 这个文件中看到

3. 最后将切分好的 Chunk 拼接到 Prompt 中发送给 LLM 为我们生成问题, 将问题存入到数据库中

## 文档格式

从上述的过程中可以看到, 我们会有一个切片的过程, 这也就意味着 **更好文档格式会切出更好的效果, 这同时会影响 LLM 问题生成的质量**. 虽然我对切片的逻辑进行了很大程度上的优化, 让他可以尽可能的去匹配多样的格式, 但这并不是万能的, 所以还是建议用户遵循以下几点的文档格式

### 明确的标题

这里的标题并不是单指 `#1` 这样的大标题, 而是指每一个段落都应该有其严格的标题进行引领.

```markdown
✔️

# Hello World

some content

## How to see hello

some content
```

```markdown
❌

# Hello World

some content
How to see hello
some content
```

### 不建议过长的代码块

不建议在文档中存在内容过长且无注释的代码块(超出 2500 token), 因为这样的 Chunk 中可能只携带了代码而无内容描述, 这会导致 LLM 无法生成优质的问题. 如果您认为您文档中的代码很重要, 那么请您给予他们注释, 并对其进行有条理的拆分

````markdown
✔️

```js
// this is a sum funciton to sum a and b
fucntion sum(a, b) {
  // ....
  // lines 2000
  // ...
}
```
````

````markdown
❌

```js
fucntion sum(a, b) {
  // ....
  // lines 2000
  // ...
}
```
````

### 案例文档

我准备了 vue 仓库中的有关描述 `props` 的[文档](https://github.com/codeacme17/examor/blob/main/docs/templates/zh-vue-props.md) , 他有着十分友好的文档格式, 推荐使用该文档进行借鉴或者测试
