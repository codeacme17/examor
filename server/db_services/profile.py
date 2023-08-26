import os

from utils import types
from db_services.MySQLHandler import MySQLHandler


def get_profile():
    query = """
            SELECT * 
            FROM t_profile 
            LIMIT 1;
            """
    profile = MySQLHandler().execute_query(query, single=True)

    if (not profile):
        init_profile()
        profile = get_profile()

    return profile


def init_profile():
    query = """
            INSERT INTO t_profile (questionAmount, currentRole, currentModel)
            VALUES (5, 'examiner', 'OpenAI');
            """
    MySQLHandler().insert_table_data(query)


def set_profile(data: types.Profile):
    query = """
            UPDATE t_profile
            SET questionAmount = %s,
                currentRole = %s,
                currentModel = %s,
                openaiKey = %s,
                openaiOrganization = %s,
                azureKey = %s,
                openaiVersion = %s,
                openaiBase = %s,
                deploymentName = %s,
                notionKey = %s,
                proxy = %s
            WHERE id = %s;
            """

    _data = (
        data.questionAmount,
        data.currentRole,
        data.currentModel,
        data.openaiKey,
        data.openaiOrganization,
        data.azureKey,
        data.openaiVersion,
        data.openaiBase,
        data.deploymentName,
        data.notionKey,
        data.proxy,
        os.environ["PROFILE_ID"]
    )

    MySQLHandler().update_table_data(query, _data)


def set_profile_to_env():
    data: types.Profile = get_profile()
    os.environ["PROFILE_ID"] = str(data['id'])
    os.environ['QUESTION_AMOUNT'] = str(data['questionAmount'])
    os.environ['CURRENT_ROLE'] = data['currentRole']
    os.environ['CURRENT_MODEL'] = data['currentModel']

    os.environ['OPENAI_API_KEY'] = data['openaiKey']
    os.environ['OPENAI_ORGANIZATION'] = data['openaiOrganization']

    os.environ['AZURE_KEY'] = data['azureKey']
    os.environ['OPENAI_VERSION'] = data['openaiVersion']
    os.environ['OPENAI_BASE'] = data['openaiBase']
    os.environ['DEPLOYMENT_NAME'] = data['deploymentName']

    os.environ['NOTION_KEY'] = data['notionKey']
    os.environ['PROXY'] = f"http://{data['proxy']}"
