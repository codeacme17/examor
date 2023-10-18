import os


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
                            result[lang_dir][category_dir].append({
                                'name': file.split('.')[0],
                                'category': category_dir,
                            })
    return result
