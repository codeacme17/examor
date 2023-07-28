# coding:utf-8

import asyncio
import os

from langchain_services.LangchainService import LangchainService


async def gen_q(
    note_name: str,
):
    path = f"./{note_name}"
    files = os.listdir(path)

    for file in files:
        with open(f"./{note_name}/{file}", "r", encoding='utf-8') as f:
            doc_content = f.read()
            langchain_service = LangchainService(
                "en",
                "question_generate"
            )
            questions = await langchain_service.agenerate_questions(
                doc_content,
                "python",
            )

            for q in questions:
                print("+++++++++++++++++++++++++++++++++++++")
                print(q)


def a():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(gen_q("vue"))


# a()


context = '''
### **WSGI**

> Reference：[PEP 3333 – Python Web Server Gateway Interface](https://peps.python.org/pep-3333/)

WSGI，全称 Web Server Gateway Interface - **服务器网关接口**，指定了 web 服务器和 Python web 应用或 web 框架之间的标准接口，以促进跨各种 Web 服务器的 Web 应用程序可移植性和兼容性

WSGI 并不是框架而是一种协议，可以将 WSGI 协议分为三个组件 `Application`, `Server`, `Middleware` 和协议中传输的内容

**协议内容**：WSGI 接口有服务端和应用端两部分，服务端也可以叫网关端，应用端也叫框架端。服务端调用一个由应用端提供的可调用对象。如何提供这个对象，由服务端决定。例如某些服务器或者网关需要应用的部署者写一段脚本，以创建服务器或者网关的实例，并且为这个实例提供一个应用实例。另一些服务器或者网关则可能使用配置文件或其他方法以指定应用实例应该从哪里导入或获取

- **Application** - _Django、Flask_
  应用程序，是一个可重复调用的可调用对象，在 Python 中可以是一个函数，也可以是一个类，如果是类的话要实现 `__call__` 方法，要求这个可调用对象接受 2 个参数，返回一个内容结果。其中接收的 2 个参数分别是 `environ` 和 `start_response`

  - `environ` 是 web 服务器解析 HTTP 协议的一些信息，例如请求方法，请求 URI 等信息构成的一个 `Dict` 对象
  - `start_response` 是一个函数，接收 2 个参数，一个是 HTTP 状态码，一个是 HTTP 消息中的响应头
    以下代码实现简单的 application

  ```python
  def simple_app(environ, start_response):
  		"""Simplest possible application object"""
  		status = '200 ok'
  		response_headers = [('Content-type', 'text/plain; charset=utf-8')]
  		start_response(status, response_headers)

  		return_body = []

  		for key, value in environ.items():
  				return_body.append("{}: {}".format(key, value))
  		return_body.append("\nHello WSGI!")
  		return ["\n".join(return_body).encode("utf-8")]
  ```

- **Server** - _uWSGI、gunicorn_
  Web 服务器，主要是实现相应的信息转换，将网络请求中的信息，按照 HTTP 协议将内容拿出，同时按照 WSGI 协议组成新的数据，同时将提供的 `start_response` 传递给 Application。最后接收 Application 返回的内容，按照 WSGI 协议解析出。最终按照 HTTP 协议组织好内容返回就完成了一次请求
  Server 操作步骤如下：
  - 根据 HTTP 协议内容构建 `envrion`
  - 提供一个 `start_response` 函数，接收 HTTP STATUS 和 HTTP HEADER
  - 将 `envrion` 和 `start_response` 作为参数调用 Application
  - 接收 Application 返回的结果
  - 按照 HTTP 协议，顺序写入 HTTP 响应头（`start_response` 接收），HTTP 响应体（Application 返回结果）
- **Middleware** - _Flask 框架中的装饰器_
  中间件，可以理解为对应程序的一组装饰器
  在应用程序端看来，它可以提供一个类 `start_response` 函数，可以向 `start_response` 函数一样接收 HTTP STATUS 和 Headers
'''

answer = """
WSGI 中的组件有 Application、Server、Middleware。
"""


async def exam_an():
    langchain_service = LangchainService(
        "zh-CN",
        "answer_examine",
        streaming=True
    )
    exmine_answer = await langchain_service.aexamine_answer(
        title="python",
        context=context,
        quesiton="WSGI 协议有哪些组件？",
        answer=answer
    )

    print(exmine_answer)


def b():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(exam_an())


b()
