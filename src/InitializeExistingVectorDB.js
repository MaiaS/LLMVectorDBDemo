import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { client } from "./weaviateClient.js";
export default async function InitializeExisitingVectorDB(index) {
  // Create a store for an existing index
  const store = await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
    client,
    indexName: index,
  });
  return store;
}
