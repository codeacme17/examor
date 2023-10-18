import os
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
    res = bank_structure[language][category]
    return api_result.success(res)


def import_bank_to_note(data: types.ImportBankData):
    print(data)
    return api_result.success("Import question bank successfully")
