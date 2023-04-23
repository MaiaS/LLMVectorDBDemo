import { EPubLoader } from "langchain/document_loaders/fs/epub";
//import { NotionLoader } from "langchain/document_loaders/fs/notion";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadEpubDocuments(file) {
  try {
    const loader = new EPubLoader(file);
    //const loader = new NotionLoader(file);

    const docs = await loader.load({ splitChapters: true });

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 1,
    });
    const texts = await textSplitter.splitDocuments(docs);

    return texts;
  } catch (e) {
    console.error(e);
  }
}
