import env from "dotenv";
import weaviate from "weaviate-ts-client";

env.config();

export const client = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME || "https",
  host: process.env.WEAVIATE_HOST || "localhost",
  // apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || "default"),
});
