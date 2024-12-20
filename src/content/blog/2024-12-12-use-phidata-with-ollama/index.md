---
title: 'Building 5 AI Agents with phidata and Ollama'
seoTitle: 'How to Build AI Agents with phidata and Ollama'
slug: 'build-ai-agents-phidata-ollama'
description: 'Discover how to create AI agents for web search, financial analysis, reasoning, and retrieval-augmented generation using phidata and the Ollama local LLM.'
pubDate: '2024-12-12'
updatedDate: '2024-12-12'
tags: ['Agents', 'phidata', 'Ollama', 'Local LLM', 'python', 'LLM', 'RAG', 'ai']
---

In this article, we will explore how to create AI agents for web search, financial analysis, reasoning, and retrieval-augmented generation using phidata and the Ollama local LLM. The code uses llama3.2 model. If you want to use a different model, you will need to download the model you want to use and replace the model_id variable in the code.

## What is Phidata?

An open-source platform to build, ship and monitor agentic systems.  
https://www.phidata.com/

## What is Ollama?

Ollama is a platform and toolset designed to simplify the deployment and use of local large language models (LLMs).  
https://ollama.ai/

In this article, we will use the llama3.2 model.

```shell
ollama pull llama3.2
```

## What is UV?

An extremely fast Python package and project manager, written in Rust.
https://github.com/astral-sh/uv

If you don't want to use uv, you can use `pip` instead of uv. Then you will need to use `pip install` instead of `uv add`.

## How to Install UV

https://docs.astral.sh/uv/getting-started/installation/

## Create a Project Folder

If you decided to use pip, you will need to create a project folder.

```shell
uv init phidata-ollama
```

## Install Dependencies

```shell
uv add phidata ollama duckduckgo-search yfinance pypdf lancedb tantivy sqlalchemy
```

In this article, we will try to create 5 AI agents with phidata and Ollama.
**Note:** Before starting, make sure your ollama server is running by running `ollama serve`.

## Create a Web Search Agent

The first agent we will create is a web search agent which will use DuckDuckGo search engine.

```python
from phi.agent import Agent
from phi.model.ollama import Ollama
from phi.tools.duckduckgo import DuckDuckGo

model_id = "llama3.2"
model = Ollama(id=model_id)

web_agent = Agent(
    name="Web Agent",
    model=model,
    tools=[DuckDuckGo()],
    instructions=["Always include sources"],
    show_tool_calls=True,
    markdown=True,
)
web_agent.print_response("Tell me about OpenAI Sora?", stream=True)
```

Output:

```
┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃ Tell me about OpenAI Sora?                                              ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┏━ Response (12.0s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃                                                                         ┃
┃  • Running: duckduckgo_news(query=OpenAI Sora)                          ┃
┃                                                                         ┃
┃ OpenAI's Sora is a video-generating model that has been trained on      ┃
┃ copyrighted content, which has raised concerns about its legality.      ┃
┃ According to TechCrunch, it appears that OpenAI trained Sora on game    ┃
┃ content, which could be a problem. Additionally, MSN reported that the  ┃
┃ model doesn't feel like the game-changer it was supposed to be.         ┃
┃                                                                         ┃
┃ In other news, Yahoo reported that when asked to generate gymnastics    ┃
┃ videos, Sora produces horrorshow videos with whirling and morphing      ┃
┃ limbs. A lawyer told ExtremeTech that it's "overwhelmingly likely" that ┃
┃ copyrighted materials are included in Sora's training dataset.          ┃
┃                                                                         ┃
┃ Geeky Gadgets reviewed OpenAI's Sora, stating that while it is included ┃
┃ in the $200/month Pro Plan, its standalone value for video generation   ┃
┃ is less clear compared to other options.                                ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Create a Finance Agent

The second agent we will create is a finance agent which will use yfinance tools.

```python
from phi.agent import Agent
from phi.model.ollama import Ollama
from phi.tools.yfinance import YFinanceTools

model_id = "llama3.2"
model = Ollama(id=model_id)

finance_agent = Agent(
    name="Finance Agent",
    model=model,
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True, company_info=True, company_news=True)],
    instructions=["Use tables to display data"],
    show_tool_calls=True,
    markdown=True,
)
finance_agent.print_response("Summarize analyst recommendations for NVDA", stream=True)
```

Output:

```
┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃ Summarize analyst recommendations for NVDA                              ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┏━ Response (3.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃                                                                         ┃
┃  • Running: get_analyst_recommendations(symbol=NVDA)                    ┃
┃                                                                         ┃
┃ Based on the analyst recommendations, here is a summary:                ┃
┃                                                                         ┃
┃  • The overall sentiment is bullish, with 12 strong buy and buy         ┃
┃    recommendations.                                                     ┃
┃  • There are no strong sell or sell recommendations.                    ┃
┃  • The average price target for NVDA is around $500-$550.               ┃
┃  • Analysts expect NVDA to continue its growth trajectory, driven by    ┃
┃    its strong products and services in the tech industry.               ┃
┃                                                                         ┃
┃ Please note that these recommendations are subject to change and may    ┃
┃ not reflect the current market situation. It's always a good idea to do ┃
┃ your own research and consult with a financial advisor before making    ┃
┃ any investment decisions.                                               ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Create an Agent Team

The third agent we will create is an agent team which will use DuckDuckGo search engine and YFinance tools.

```python
from phi.agent import Agent
from phi.model.ollama import Ollama
from phi.tools.duckduckgo import DuckDuckGo
from phi.tools.yfinance import YFinanceTools

web_instructions = 'Always include sources'
finance_instructions = 'Use tables to display data'

model_id = "llama3.2"
model = Ollama(id=model_id)

web_agent = Agent(
    name="Web Agent",
    role="Search the web for information",
    model=model,
    tools=[DuckDuckGo()],
    instructions=[web_instructions],
    show_tool_calls=True,
    markdown=True,
)

finance_agent = Agent(
    name="Finance Agent",
    role="Get financial data",
    model=model,
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True, company_info=True)],
    instructions=[finance_instructions],
    show_tool_calls=True,
    markdown=True,
)

agent_team = Agent(
    model=model,
    team=[web_agent, finance_agent],
    instructions=[web_instructions, finance_instructions],
    show_tool_calls=True,
    markdown=True,
)

agent_team.print_response("Summarize analyst recommendations and share the latest news for NVDA", stream=True)
```

## Create an Inference Agent

The fourth agent we will create is an inference agent which will use a task.

```python
from phi.agent import Agent
from phi.model.ollama import Ollama

model_id = "llama3.2"
model = Ollama(id=model_id)

task = (
   "Three missionaries and three cannibals want to cross a river."
"There is a boat that can carry up to two people, but if the number of cannibals exceeds the number of missionaries, the missionaries will be eaten."
)

reasoning_agent = Agent(model=model, reasoning=True, markdown=True, structured_outputs=True)
reasoning_agent.print_response(task, stream=True, show_full_reasoning=True)
```

Output:

```
┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃ Three missionaries and three cannibals want to cross a river.There is a ┃
┃ boat that can carry up to two people, but if the number of cannibals    ┃
┃ exceeds the number of missionaries, the missionaries will be eaten.     ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
[Reasoning steps and output as in the original document]
```

## Create a RAG Agent

The fifth agent we will create is a RAG agent which will use a PDF knowledge base and a LanceDB vector db.

```python
from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.embedder.openai import OpenAIEmbedder
from phi.embedder.ollama import OllamaEmbedder

from phi.model.ollama import Ollama
from phi.knowledge.pdf import PDFUrlKnowledgeBase
from phi.vectordb.lancedb import LanceDb, SearchType

model_id = "llama3.2"
model = Ollama(id=model_id)
embeddings = OllamaEmbedder().get_embedding("The quick brown fox jumps over the lazy dog.")

knowledge_base = PDFUrlKnowledgeBase(
    urls=["https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf"],
    vector_db=LanceDb(
        table_name="recipes",
        uri="tmp/lancedb",
        search_type=SearchType.vector,
        embedder=OllamaEmbedder(),
    ),
)

knowledge_base.load()

agent = Agent(
    model=model,
    knowledge=knowledge_base,
    show_tool_calls=True,
    markdown=True,
)

agent.print_response("Please tell me how to make green curry.", stream=True)
```

Output:

```shell
uv run rag_agent.py
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
INFO     Creating collection
INFO     Loading knowledge base
INFO     Reading:
         https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
WARNING  model "openhermes" not found, try pulling it first
INFO     Added 14 documents to knowledge base
WARNING  model "openhermes" not found, try pulling it first
ERROR    Error searching for documents: list index out of range
┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃ Please tell me how to make green curry.                                 ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┏━ Response (5.4s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                         ┃
┃                                                                         ┃
┃  • Running: search_knowledge_base(query=green curry recipe)             ┃
┃                                                                         ┃
┃ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┃
┃ ┃                         Green Curry Recipe                          ┃ ┃
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ┃
┃                                                                         ┃
┃ ** Servings: 4-6 people**                                               ┃
┃                                                                         ┃
┃ Ingredients:                                                            ┃
┃                                                                         ┃
┃  • 2 tablespoons vegetable oil                                          ┃
┃  • 2 cloves garlic, minced                                              ┃
┃  • 1 tablespoon grated fresh ginger                                     ┃
┃  • 2 tablespoons Thai red curry paste                                   ┃
┃  • 2 cups coconut milk                                                  ┃
┃  • 1 cup mixed vegetables (such as bell peppers, bamboo shoots, and     ┃
┃    Thai eggplant)                                                       ┃
┃  • 1 pound boneless, skinless chicken breasts or thighs, cut into       ┃
┃    bite-sized pieces                                                    ┃
┃  • 2 tablespoons fish sauce                                             ┃
┃  • 1 tablespoon palm sugar                                              ┃
┃  • 1/4 teaspoon ground white pepper                                     ┃
┃  • Salt to taste                                                        ┃
┃  • Fresh basil leaves for garnish                                       ┃
┃                                                                         ┃
┃ Instructions:                                                           ┃
┃                                                                         ┃
┃  1 Prepare the curry paste: In a blender or food processor, combine the ┃
┃    curry paste, garlic, ginger, fish sauce, palm sugar, and white       ┃
┃    pepper. Blend until smooth.                                          ┃
┃  2 Heat oil in a pan: Heat the oil in a large skillet or Dutch oven     ┃
┃    over medium-high heat.                                               ┃
┃  3 Add the curry paste: Pour the blended curry paste into the hot oil   ┃
┃    and stir constantly for 1-2 minutes, until fragrant.                 ┃
┃  4 Add coconut milk: Pour in the coconut milk and bring the mixture to  ┃
┃    a simmer.                                                            ┃
┃  5 Add vegetables and chicken: Add the mixed vegetables and chicken     ┃
┃    pieces to the pan. Stir gently to combine.                           ┃
┃  6 Reduce heat and cook: Reduce the heat to medium-low and let the      ┃
┃    curry simmer, uncovered, for 20-25 minutes or until the chicken is   ┃
┃    cooked through and the sauce has thickened.                          ┃
┃  7 Season with salt and taste: Season the curry with salt to taste.     ┃
┃    Serve hot garnished with fresh basil leaves.                         ┃
┃                                                                         ┃
┃ Tips and Variations:                                                    ┃
┃                                                                         ┃
┃  • Adjust the level of spiciness by using more or less Thai red curry   ┃
┃    paste.                                                               ┃
┃  • Add other protein sources like shrimp, tofu, or tempeh for a         ┃
┃    vegetarian or vegan option.                                          ┃
┃  • Experiment with different vegetables, such as zucchini or carrots,   ┃
┃    to add variety.                                                      ┃
┃                                                                         ┃
┃ Tools Used: Python                                                      ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Conclusion

In this article, we explored how to create AI agents for web search, financial analysis, reasoning, and retrieval-augmented generation using phidata and the Ollama local LLM.
