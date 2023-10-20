import os
import json

BANK_ROOT_FOLDER = "question_bank"


def generate_structure():
    result = {}
    for lang_dir in os.listdir(BANK_ROOT_FOLDER):
        path_lang = os.path.join(BANK_ROOT_FOLDER, lang_dir)
        if os.path.isdir(path_lang):
            result[lang_dir] = {}
            for category_dir in os.listdir(path_lang):
                path_category = os.path.join(path_lang, category_dir)
                if os.path.isdir(path_category):
                    result[lang_dir][category_dir] = []
                    for file in os.listdir(path_category):
                        if file.endswith('.json'):
                            file_path = os.path.join(path_category, file)
                            file_content = _is_valid_json_file(file_path)
                            if file_content:
                                parsed_data = _parse_json_file(
                                    file_content, file_path)
                                result[lang_dir][category_dir].append({
                                    'name': file.split('.')[0],
                                    'category': category_dir,
                                    **parsed_data
                                })
                            else:
                                print(f"File is empty: {file_path}")
    return result


def _is_valid_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        file_content = f.read()
        return file_content.strip() and file_content


def _parse_json_file(file_content, file_path):
    try:
        content = json.loads(file_content)
        icon = content.get('icon', "")
        description = content.get('description', "")
        link = content.get('link', "")
        total_question_count = content.get('total_question_count', 0)
        return {
            'icon': icon,
            'description': description,
            'link': link,
            'totalQuestionCount': total_question_count
        }
    except json.JSONDecodeError:
        print(f"Error decoding JSON: {file_path}")
        return {}


def get_bank_content(language: str, category: str, bank_name: str):
    target_path = f"{BANK_ROOT_FOLDER}/{language}/{category}/{bank_name}.json"
    try:
        with open(target_path, "r", encoding="utf-8") as f:
            content = json.loads(f.read())
            return content
    except FileNotFoundError:
        raise Exception(f"File not found: {target_path}")
    except json.JSONDecodeError:
        raise Exception(f"Error decoding JSON: {target_path}")
