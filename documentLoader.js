import { EPubLoader } from "langchain/document_loaders/fs/epub";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadEpubDocuments(file) {
  const loader = new EPubLoader(file);

  const docs = await loader.load({ splitChapters: true });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 1,
  });
  const texts = await textSplitter.splitDocuments(docs);
  return texts;
}
loadEpubDocuments("example.epub");
