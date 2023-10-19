import db_services as _dbs_
from utils import api_result, types, bank_handler as _bh_


def get_categories(language: str):
    bank_structure = _bh_.generate_structure()
    categories_structure = bank_structure[language]
    res = []
    for category in categories_structure:
        res.append(category)
    return api_result.success(res)


def get_banks(language: str, category: str):
    bank_structure = _bh_.generate_structure()

    if category == 'all':
        res = []
        for _category in bank_structure[language]:
            res.extend(bank_structure[language][_category])
    else:
        res = bank_structure[language][category]

    return api_result.success(res)


def import_bank_to_note(data: types.ImportBankData):
    # If there has note name means create a new note. either use exist note
    if data.note_name:
        if (_dbs_.note.is_duplicate(data.note_name)):
            return api_result.error("Note name already exists")
        note_id = _dbs_.note.get_inserted_note_id(data.note_name)
    else:
        note_id = data.note_id

    content = _bh_.get_bank_content(
        data.language,
        data.category,
        data.bank_name
    )

    files = content['files']
    question_type = content['question_type']
    designated_role = content['designated_role']

    for file_item in files:
        file_name = file_item["file_name"]
        question_count = file_item["question_count"]
        file_id = _dbs_.file.add_file_to_db(
            note_id, file_name, question_count, "0")

        for document_item in file_item['documents']:
            document_content = document_item['content']
            document_id = _dbs_.document.save_doc_to_db(
                note_id, file_id, file_name, document_content)

            for question_content in document_item['questions']:
                _dbs_.question.save_question_to_db(
                    question_content, document_id, question_type, designated_role)

    return api_result.success("Import question bank successfully")
