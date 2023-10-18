import os
import json


def generate_structure(root_folder="temp"):
    result = {}
    for lang_dir in os.listdir(root_folder):
        path_lang = os.path.join(root_folder, lang_dir)
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
