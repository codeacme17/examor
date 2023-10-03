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
            INSERT INTO t_profile ()
            VALUES ();
            """
    MySQLHandler().insert_table_data(query)


def set_profile(data: types.Profile):
    fields = [
        "questionAmount",
        "currentRole",
        "currentModel",
        "openaiModel",
        "openaiKey",
        "openaiOrganization",
        "openaiBase",
        "openaiProxy",
        "azureKey",
        "azureBase",
        "openaiVersion",
        "deploymentName",
        "anthropicModel",
        "anthropicKey",
        "anthropicVersion",
        "notionKey"
    ]
    query = "UPDATE t_profile SET " + \
        ", ".join([f"{field} = %s" for field in fields]) + " WHERE id = %s;"
    _data = tuple(getattr(data, field)
                  for field in fields) + (os.environ["PROFILE_ID"],)
    MySQLHandler().update_table_data(query, _data)


def set_profile_to_env():
    data: types.Profile = get_profile()
    env_keys = {
        # Individual
        "PROFILE_ID": ('id', ""),
        "QUESTION_AMOUNT": ('questionAmount', ""),
        "CURRENT_ROLE": ('currentRole', ""),
        "CURRENT_MODEL": ('currentModel', ""),
        # OpenAI
        "OPENAI_MODEL": ('openaiModel', "gpt-3.5-turbo"),
        "OPENAI_API_KEY": ('openaiKey', ""),
        "OPENAI_ORGANIZATION": ('openaiOrganization', ""),
        "OPENAI_BASE": ('openaiBase', "https://api.openai.com"),
        "OPENAI_API_PROXY": ('openaiProxy', ""),
        # Azure
        "AZURE_KEY": ('azureKey', ""),
        "AZURE_BASE": ('azureBase', ""),
        "AZURE_VERSION": ('openaiVersion', ""),
        "AZURE_DEPLOYMENT_NAME": ('deploymentName', ""),
        # Anthropic
        "ANTHROPIC_MODEL": ('anthropicModel', 'claude-2'),
        "ANTHROPIC_KEY": ('anthropicKey', ""),
        "ANTHROPIC_VERSION": ('anthropicVersion', '2023-06-01'),
        # Notion
        "NOTION_KEY": ('notionKey', "")
    }
    for env_key, (data_key, default_value) in env_keys.items():
        value = data.get(data_key)
        if value is None or value == "":
            value = default_value
        os.environ[env_key] = str(value)


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
