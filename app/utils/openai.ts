import OpenAI from 'openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Document } from 'langchain/document';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const createStore = (docs: Document<Record<string, any>>[]) =>
  MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
  );

const docsFromPDF = () => {
  const filePath = path.join(process.cwd(), 'public');
  const loader = new DirectoryLoader(`${filePath}`, {
    '.pdf': (path) => new PDFLoader(path),
  });
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '. ',
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  );
};

const loadStore = async () => {
  const pdfDocs = await docsFromPDF();
  return createStore([...pdfDocs]);
};

export { openai, loadStore };
