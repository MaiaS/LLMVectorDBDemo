import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import loadEpubDocuments from "./documentLoader.js";
import { client } from "./weaviateClient.js";
import env from "dotenv";
env.config();

export default async function initVectorDB() {
  // const docs = await loadEpubDocuments("docs");
  const docs = await loadEpubDocuments("example.epub");

  const res = await WeaviateStore.fromDocuments(
    docs.map((doc) => ({
      pageContent: doc.pageContent,
      metadata: { source: doc.metadata.source },
    })),
    new OpenAIEmbeddings(),
    {
      client,
      indexName: process.env.WEAVIATE_INDEX,
      textKey: "text",
    }
  );

  if (res.isAxiosError) {
    throw new Error("Something went wrong", res.toJson());
  }
}

initVectorDB();
