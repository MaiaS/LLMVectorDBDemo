import env from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { ChainTool } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import prompt from "./readLine.js";
import InitializeExisitingVectorDB from "./InitializeExistingVectorDB.js";

env.config();

const accuChat = new ChatOpenAI({
  temperature: 0,
});

const model = new OpenAI({ temperature: 0 });

const vectorDbStore = await InitializeExisitingVectorDB(
  process.env.WEAVIATE_INDEX
);

const vectorChain = VectorDBQAChain.fromLLM(
  /* accuChat */ model,
  vectorDbStore
);

const qaTool = new ChainTool({
  name: "search-current-book",
  description:
    "A tool to search the book - you can input the users question as a query and use the response as context for the user question",
  chain: vectorChain,
});

const tools = [qaTool];

const agentChat = await initializeAgentExecutorWithOptions(tools, accuChat, {
  agentType: "chat-conversational-react-description",
  verbose: true,
  memory: new BufferMemory({ returnMessages: true, memoryKey: "chat_history" }),
});

console.log("Loaded agent.");

async function infiniteConversation(promptArgument) {
  const result = await prompt(promptArgument);
  const aiResult = await agentChat.call({ input: result });
  await infiniteConversation(aiResult.output);
}
infiniteConversation("Hello Human. What do you want to talk about?");
