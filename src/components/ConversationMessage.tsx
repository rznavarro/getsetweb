import { MathRenderer } from './MathRenderer';
import { User, Bot } from 'lucide-react';

interface ConversationMessageProps {
  type: 'question' | 'answer';
  content: string;
  imageUrl?: string;
}

export function ConversationMessage({ type, content, imageUrl }: ConversationMessageProps) {
  const isQuestion = type === 'question';

  return (
    <div className={`flex gap-4 ${isQuestion ? 'justify-end' : 'justify-start'}`}>
      {!isQuestion && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}

      <div className={`max-w-3xl ${isQuestion ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-2xl p-5 ${
            isQuestion
              ? 'bg-[#003366] text-white font-montserrat'
              : 'bg-[#6699CC] shadow-lg'
          }`}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Problema matemático"
              className="mb-4 rounded-lg max-w-full h-auto border-2 border-white/20"
            />
          )}

          {isQuestion ? (
            <p className="whitespace-pre-wrap font-montserrat">{content}</p>
          ) : (
            <MathRenderer content={content} />
          )}
        </div>
      </div>

      {isQuestion && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center order-2">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
}
