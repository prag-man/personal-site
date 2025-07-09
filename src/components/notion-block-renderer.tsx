'use client';

import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface NotionBlockRendererProps {
  blocks: BlockObjectResponse[];
}

interface RichTextItemProps {
  text: any;
}

function RichTextItem({ text }: RichTextItemProps) {
  let content = text.plain_text;
  
  if (text.annotations.bold) {
    content = <strong>{content}</strong>;
  }
  if (text.annotations.italic) {
    content = <em>{content}</em>;
  }
  if (text.annotations.strikethrough) {
    content = <s>{content}</s>;
  }
  if (text.annotations.underline) {
    content = <u>{content}</u>;
  }
  if (text.annotations.code) {
    content = <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{content}</code>;
  }
  
  if (text.href) {
    content = (
      <a 
        href={text.href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
  
  return <span>{content}</span>;
}

interface RichTextProps {
  richText: any[];
}

function RichText({ richText }: RichTextProps) {
  return (
    <>
      {richText.map((text, index) => (
        <RichTextItem key={index} text={text} />
      ))}
    </>
  );
}

interface BlockProps {
  block: BlockObjectResponse;
}

function Block({ block }: BlockProps) {
  const { type } = block;
  
  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-4">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );
    
    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold mb-6 mt-8">
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );
    
    case 'heading_2':
      return (
        <h2 className="text-2xl font-semibold mb-4 mt-6">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );
    
    case 'heading_3':
      return (
        <h3 className="text-xl font-medium mb-3 mt-5">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );
    
    case 'bulleted_list_item':
      return (
        <ul className="list-disc list-inside mb-2">
          <li>
            <RichText richText={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );
    
    case 'numbered_list_item':
      return (
        <ol className="list-decimal list-inside mb-2">
          <li>
            <RichText richText={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );
    
    case 'to_do':
      return (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mr-2"
          />
          <span className={block.to_do.checked ? 'line-through text-gray-500' : ''}>
            <RichText richText={block.to_do.rich_text} />
          </span>
        </div>
      );
    
    case 'code':
      return (
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm">
            <RichText richText={block.code.rich_text} />
          </code>
        </pre>
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 italic">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    
    case 'divider':
      return <hr className="my-8 border-gray-200" />;
    
    case 'image':
      const imageUrl = block.image.type === 'external' 
        ? block.image.external.url 
        : block.image.file.url;
      
      return (
        <div className="mb-4">
          <img 
            src={imageUrl} 
            alt="Notion image" 
            className="max-w-full h-auto rounded-lg"
          />
          {block.image.caption && block.image.caption.length > 0 && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              <RichText richText={block.image.caption} />
            </p>
          )}
        </div>
      );
    
    case 'bookmark':
      return (
        <div className="border rounded-lg p-4 mb-4">
          <a 
            href={block.bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {block.bookmark.url}
          </a>
          {block.bookmark.caption && block.bookmark.caption.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              <RichText richText={block.bookmark.caption} />
            </p>
          )}
        </div>
      );
    
    default:
      return (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-gray-600">
            Unsupported block type: {type}
          </p>
        </div>
      );
  }
}

export default function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
} 