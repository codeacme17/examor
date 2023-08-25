# Role Manual

> Version: 0.1

### Attribute Introduction

- Extensiveness:
  Extensiveness represents the extent to which questions are based on document content. Similarly, roles with higher extensiveness will increase the difficulty of questions.

- Rigor:
  Rigor indicates how strict a role's grading is. Roles with higher rigor will have more demanding grading criteria. However, roles with lower rigor might offer some sympathy points (generally not scoring zero, unless answers are way off).

### Role Introduction

#### 🥷 Examiner

| Extensiveness | Rigor |
| ------------- | ----- |
| ⭐️           | 😭    |

The examiner is an extremely strict role. They meticulously craft questions based on the document's content and have a high standard for scoring. Getting a full score from them is quite challenging unless your answers closely mirror the document.

#### 👩‍🏫 Teacher

| Extensiveness | Rigor |
| ------------- | ----- |
| ⭐️⭐️        | 😏    |

The teacher is a benevolent figure. They treat your responses as a casual test and grade leniently. Additionally, they might add a slight extension based on your document. Rest assured, it's just a minor expansion.

#### 👨‍💻 Interviewer

| Extensiveness | Rigor |
| ------------- | ----- |
| ⭐️⭐️⭐️     | 😐    |

The interviewer immerses you in an interview scenario. Their questions are nearly all derived from expanding on the document. Hence, this role is the most challenging. Yet, their grading isn't overly strict; they evaluate your breadth of knowledge, akin to a real interview where assessment covers various dimensions.

### Notice

When generating a question, the role assumed during question generation is stored within the information of that question. In other words, if a question is generated with the role of an **examiner**, then when evaluating responses to that question in the future, it will also be assessed from the perspective of an **examiner**. The role used for question generation is displayed within the question component.

<img src="./screen-shot/role-emoji-en.png">

### Case Study

In this section, I will use the three roles to generate questions for the same document, showcasing the distinctions in the roles' approaches. Below is the document content:

```markdown
### **Optimizations in Vue3 Compared to Vue2**

- Smaller Footprint
  - Vue3 is significantly smaller than Vue2 due to the removal of outdated or rarely used features and optimized code.
  - Vue3 splits the compiler and runtime, allowing only the runtime code to load during runtime, and the compiler's code is reserved for development.
- Faster Rendering
  - Vue3's rendering engine uses **Compile-time Optimizations**, generating optimized rendering functions through static analysis of template code, enhancing rendering speed.
  - Vue3's compiler compiles templates into rendering functions during compilation and caches them, avoiding the overhead of recompiling templates during every rendering.
- Improved TypeScript Support
  Vue3 offers enhanced TypeScript support, including better type definitions and improved type inference, contributing to code organization, readability, and maintainability.
- Virtual DOM Optimization
  - Static Hoisting: In Vue3, nodes marked as static can be optimized into constants, avoiding unnecessary comparisons in the diff algorithm. Static nodes are those that remain unchanged during rendering and can be optimized using the `hoistStatic` compilation option.
  - Lazy Loading: In Vue3, the `suspense` and `lazy` directives facilitate lazy loading.
    - `suspense` is a placeholder component that displays before an asynchronous component finishes loading.
    - `lazy` directive delays rendering components until they enter the viewport.
  - Caching: Vue can cache rendered components to prevent unnecessary re-rendering, achievable through the `cacheHandlers` compilation option.
- Enhanced Reactive System
  - Vue 3 uses ES6's `Proxy` class to monitor object changes. `Proxy` can observe entire objects, whereas `Object.definProperty` can only monitor specific properties. For observing whole objects, `Proxy` eliminates the need for recursive traversal. Additionally, properties of `Map` / `Set` types can be monitored.
  - Vue 3 also introduces new `reactive` and `readonly` to offer finer control. `reactive` creates responsive objects, and `readonly` generates read-only objects.
- Improved Tree-Shaking
  Vue3 enhances Tree-Shaking support, better excluding unused modules from the code, reducing file size after packaging.
- Enhanced Code Splitting and Lazy Loading
  Vue3 employs **dynamic import** technology, enabling on-demand code splitting and lazy loading of components, reducing initial file load size.
- Enhanced Template Compilation
  Vue3's compiler has been rewritten, independent of the previous template compiler. Vue3's compiler uses static analysis technology to identify static nodes during compilation, implementing "Static Hoisting" to generate optimized rendering functions. It analyzes template dependencies more precisely, reducing unnecessary template compilation and runtime code generation.
```

#### Examiner

- Generated Questions

```markdown
- What optimizations does Vue3 offer compared to Vue2?
- How does Vue3 achieve faster rendering speed?
- What improvements does Vue3 bring to TypeScript support?
- How does Vue3 optimize the Virtual DOM?
- What optimizations have been made to Vue3's reactive system?
- How does Vue3 support better Tree-Shaking?
- How does Vue3 implement enhanced code splitting and lazy loading?
```

#### Teacher

- Generated Questions

```markdown
- Can you list the optimizations in Vue3 compared to Vue2?
- How does Vue3 enhance rendering speed?
- What are the improvements in Vue3's TypeScript support?
- Explain the optimizations for the Virtual DOM in Vue3.
- What enhancements have been made to Vue3's reactive system?
- Vue3 has improved Tree-Shaking support. Could you detail these improvements?
- Describe the ways in which Vue3 optimizes template compilation.
```

#### Interviewer

- Generated Questions

```markdown
- Why is Vue3's footprint smaller compared to Vue2?
- How does Vue3 achieve faster rendering using Compile-time Optimizations?
- What does "Static Hoisting" refer to in Vue3's Virtual DOM optimization?
- Can you explain how lazy loading is achieved in Vue3?
- In Vue3's reactive system, why does it use the `Proxy` class?
- How does Vue3 support Tree-Shaking?
- Explain the concept of dynamic import in Vue3's code splitting and lazy loading.
- How does Vue3's enhanced template compilation contribute to better performance?
```
