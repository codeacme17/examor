import os
import db_services as _dbs_

from utils import api_result, types, upload_file


def get_banks(language: str, category: str):
    print(language, category)
    return api_result.success("successs")


def import_bank_to_note(data: types.ImportBankData):
    print(data)
    return api_result.success("Import question bank successfully")


"""
@TODO

Question Bank Data Structure

{
  "question_type": "short",
  "designated_role": "examiner",
  "files": [
    {
      "file_name": "vue_1.md",
      "question_count": 30,
      "documents": [
        {
          "content": "xxxx",
          "questions": ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"]
        },
        {
          "content": "xxxx",
          "questions": ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"]
        }
      ]
    },
    {
      "file_name": "vue_2.md",
      "question_count": 40,
      "question_type": "select",
      "designated_role": "examiner",
      "documents": [
        {
          "content": "xxxx",
          "questions": ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"]
        },
        {
          "content": "xxxx",
          "questions": ["xxxx", "xxxx", "xxxx", "xxxx", "xxxx", "xxxx"]
        }
      ]
    }
  ]
}

"""
