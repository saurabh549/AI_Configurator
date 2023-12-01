from langchain.llms import AzureOpenAI
from langchain.schema import HumanMessage
import json
import os
"""
function : extract_data_from_prompt
This function will call OpenAIs API to extract required data to call exotel's API from the prompt message entered by user.
"""
def extract_data_from_prompt(prompt_message):
    prompt_data = ""
    os.environ["OPENAI_API_TYPE"] = "azure"
    os.environ["AZURE_OPENAI_API_KEY"] = "05a87e3db47149699916b25e2b6a664e"
    os.environ["AZURE_OPENAI_ENDPOINT"] = "https://gpt3-5-sc.openai.azure.com/"
    os.environ["OPENAI_API_VERSION"] = "0914"

    model = AzureOpenAI(
        openai_api_version="2023-07-01-preview",
        azure_deployment="kb-test1"
    )

    # to run 

    prompt_data = model(prompt_message)

    prompt_data = json.loads(prompt_data)

    return prompt_data


"""
function: create_exotel_campaign
This function will call the exotel's API to create the campaign.
"""
def create_exotel_campaign():
    pass