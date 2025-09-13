from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.os import AgentOS
from dotenv import load_dotenv
from agno.tools.hackernews import HackerNewsTools
from agno.tools.reasoning import ReasoningTools

from stock_agent import team as stock_team
load_dotenv()

PROMPT = """
You are a helpful AI for creating courses.
"""


assistant = Agent(
    name="Assistant",
    model=OpenAIChat(id="gpt-5-mini"),
    tools=[HackerNewsTools(), ReasoningTools()],
    instructions=[PROMPT],
    stream_intermediate_steps=True,
    markdown=True,
)

agent_os = AgentOS(
    os_id="my-first-os",
    description="My first AgentOS",
    agents=[assistant],
    teams=[stock_team],
)

app = agent_os.get_app()

if __name__ == "__main__":
    # Default port is 7777; change with port=...
    agent_os.serve(app="main:app", reload=True)