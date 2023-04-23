# Using Vector Databases to Store and Retrieve More Information
This is a demonstration showcasing some of the usecases of taking advantage of combining Vector Databases with Chat LLM's to create a chatbot that has specific memory pertaining to a user's content.

## How To Run
Run `yarn install` or `npm install` to install all dependencies.

Copy the .env.example file and make a .env file with your keys.
You will need keys from OpenAI and Weaviate.

Get the key from OpenAI. Set that in `OPENAI_API_KEY`.

Create a cluster with `Authentication` set to `No` on Weaviate. Grab the cluster HOST URL (ie: `some-cluster.weaviate.network`) set that as your `WEAVIATE_HOST`. Grab the scheme of the cluster and set that as your `WEAVIATE_SCHEME` (ie: `https`).

The `WEAVIATE_INDEX` will be the name of the index in the Vector database that queries will be performed on. (name it anything like `Test_ABC`)

Once all the keys are set up, begin initializing and storing the data in the database by running `yarn initVDB`. This will take the provided `example.epub` file and do the following:

- split it into separate chunked documents
- create embeddings of the data with OpenAI's embedding model
- load up the data in the index configured in weaviate

If that is successful, move onto the next step.

Run `yarn start` to start the conversational AI with the embedded data and test it out! The chat will have a [Buffer Memory](https://js.langchain.com/docs/modules/memory/examples/buffer_memory) attached, and will use the vector database in its arsenal as needed. When you're done playing around, just quit the program.

Occasionally the program may fail because getting chat based LLM's to perform repetitive tasks is still a bit expiremental, so be patient and try again :).

### Technologies
- [LangChain](https://js.langchain.com/docs/) - The Node version of LangChain.
- [Weaviate](https://weaviate.io/) - The vector database used.
- [Open AI](https://platform.openai.com/docs/api-reference) - Used for both the Embedding model and the agent model

