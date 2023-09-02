import os
import pandas as pd

from sqlalchemy import create_engine
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
            VALUES (7, 'examiner', 'OpenAI');
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
                openaiProxy = %s,
                azureKey = %s,
                azureBase = %s,
                openaiVersion = %s,
                deploymentName = %s,
                notionKey = %s
            WHERE id = %s;
            """

    _data = (
        data.questionAmount,
        data.currentRole,
        data.currentModel,
        data.openaiKey,
        data.openaiOrganization,
        data.openaiBase,
        data.openaiProxy,
        data.azureKey,
        data.azureBase,
        data.openaiVersion,
        data.deploymentName,
        data.notionKey,
        os.environ["PROFILE_ID"]
    )

    MySQLHandler().update_table_data(query, _data)


def set_profile_to_env():
    data: types.Profile = get_profile()
    os.environ["PROFILE_ID"] = str(data['id'])
    os.environ['QUESTION_AMOUNT'] = str(data['questionAmount']) or ""
    os.environ['CURRENT_ROLE'] = data['currentRole'] or ""
    os.environ['CURRENT_MODEL'] = data['currentModel'] or ""

    os.environ['OPENAI_API_KEY'] = data['openaiKey'] or ""
    os.environ['OPENAI_ORGANIZATION'] = data['openaiOrganization'] or ""
    os.environ['OPENAI_BASE'] = data['openaiBase'] or ""
    os.environ['OPENAI_API_PROXY'] = data['openaiProxy'] or ""

    os.environ['AZURE_KEY'] = data['azureKey'] or ""
    os.environ['AZURE_BASE'] = data['azureBase'] or ""
    os.environ['OPENAI_VERSION'] = data['openaiVersion'] or ""
    os.environ['DEPLOYMENT_NAME'] = data['deploymentName'] or ""

    os.environ['NOTION_KEY'] = data['notionKey'] or ""


def export_data(isProfile: bool, isNotes: bool):
    """
    Export data from the database to an Excel file.

    :param isProfile: Whether to export profile data.
    :param isNotes: Whether to export notes-related data.
    """
    mys = MySQLHandler()
    mys.connect_to_mysql()
    writer = pd.ExcelWriter("data.xlsx", engine="xlsxwriter")

    tables_to_export = []
    if isProfile:
        tables_to_export.append('t_profile')
    if isNotes:
        tables_to_export.extend(
            ['t_note', 't_file', 't_document', 't_question'])

    for table_name in tables_to_export:
        query = f"SELECT * FROM {table_name}"
        dft = pd.read_sql(query, mys.conn)
        dft.to_excel(writer, sheet_name=table_name, index=False)
    writer.close()


def import_data():
    """
    Import data from an Excel file into the database.
    """
    file_path = "data.xlsx"
    host = 'database' if os.environ.get('DOCKER') else 'localhost',
    port = '3306' if os.environ.get('DOCKER') else '52020',
    engine = create_engine(
        f"mysql+mysqlconnector://root:root@{host[0]}:{port[0]}/db")
    xls = pd.ExcelFile(file_path)
    sheet_names = xls.sheet_names

    for sheet_name in sheet_names:
        if sheet_name not in ['t_profile', 't_note', 't_file', 't_document', 't_question']:
            continue

        MySQLHandler().delete_table_data(f"DELETE FROM {sheet_name};")

        df = pd.read_excel(xls, sheet_name)
        df.to_sql(sheet_name, engine, if_exists='append', index=False)
