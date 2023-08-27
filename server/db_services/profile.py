import os
import pandas as pd

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
                openaiBase = %s,
                azureKey = %s,
                azureBase = %s,
                openaiVersion = %s,
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
        data.openaiBase,
        data.azureKey,
        data.azureBase,
        data.openaiVersion,
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
    os.environ['OPENAI_BASE'] = data['openaiBase']

    os.environ['AZURE_KEY'] = data['azureKey']
    os.environ['AZURE_BASE'] = data['azureBase']
    os.environ['OPENAI_VERSION'] = data['openaiVersion']
    os.environ['DEPLOYMENT_NAME'] = data['deploymentName']

    os.environ['NOTION_KEY'] = data['notionKey']
    os.environ['PROXY'] = f"http://{data['proxy']}"


def export_data():
    mys = MySQLHandler()
    mys.connect_to_mysql()
    tables = pd.read_sql("""
                        SELECT TABLE_NAME
                        FROM information_schema.TABLES
                        WHERE TABLE_SCHEMA = 'db';
                         """, mys.conn)
    writer = pd.ExcelWriter("data.xlsx", engine="xlsxwriter")
    for table_name in tables["TABLE_NAME"]:
        sheet_name = table_name
        query = "SELECT * FROM " + sheet_name
        dft = pd.read_sql(query, mys.conn)
        dft.to_excel(writer, sheet_name=sheet_name, index=False)
    writer.close()
