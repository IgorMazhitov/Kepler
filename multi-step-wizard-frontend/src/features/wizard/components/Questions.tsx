import React from 'react';

interface Props {
  question: Question;
}

interface Question {
  id: number;
  question: string;
  type: string;
  options?: string[];
}

const Questions: React.FC<Props> = ({ question }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'input':
        return <input type="text" placeholder={question.question} />;
      case 'numeric':
        return <input type="number" placeholder={question.question} />;
      case 'single-choice':
        return (
          question.options?.map((option, i) => (
            <div key={i}>
              <input type="radio" id={`option-${i}`} name={`question-${question.id}`} value={option} />
              <label htmlFor={`option-${i}`}>{option}</label>
            </div>
          ))
        );
      case 'multi-choice':
        return (
          question.options?.map((option, i) => (
            <div key={i}>
              <input type="checkbox" id={`option-${i}`} name={`question-${question.id}`} value={option} />
              <label htmlFor={`option-${i}`}>{option}</label>
            </div>
          ))
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label>{question.question}</label>
      {renderQuestion()}
    </div>
  );
};

export default Questions;
