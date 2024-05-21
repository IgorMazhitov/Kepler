import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IQuestion, QuestionType } from "../interfaces/wizard.interface";
import { saveAnswer } from "../slice/wizard.slice";
import { RootState } from "../../../store/store";
import { TextField, Radio, RadioGroup, FormControlLabel, Checkbox, Box, FormLabel, FormControl } from "@mui/material";

interface Props {
  question: IQuestion;
}

const Questions: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<string | string[] | number | null>(null);
  const answers = useSelector((state: RootState) => state.wizard.answers);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value, checked } = e.target;
    let newValue: string | string[] | number | null = null;

    if (type === "checkbox") {
      newValue = checked
        ? [...((answer as string[]) || []), value]
        : ((answer as string[]) || []).filter((v: string) => v !== value);
    } else if (type === "radio" || type === "number" || type === "text") {
      newValue = value;
    }

    setAnswer(newValue);
    dispatch(saveAnswer({ questionId: question.id, answer: newValue }));
  };

  const renderQuestion = () => {
    switch (question.type) {
      case QuestionType.INPUT:
        return (
          <TextField
            type="text"
            value={answers[question.id]?.answer || ''}
            placeholder={question.question}
            onChange={handleChange}
            fullWidth
          />
        );
      case QuestionType.NUMERIC:
        return (
          <TextField
            type="number"
            value={answers[question.id]?.answer || ''}
            placeholder={question.question}
            onChange={handleChange}
            fullWidth
          />
        );
      case QuestionType.SINGLE_CHOICE:
        return (
          <FormControl component="fieldset">
            <RadioGroup name={`question-${question.id}`} value={answers[question.id]?.answer || ''} onChange={handleChange}>
              {question.options?.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case QuestionType.MULTI_CHOICE:
        return (
          <FormControl component="fieldset">
            {question.options?.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={(answers[question.id]?.answer as string[])?.includes(option) || false}
                    onChange={handleChange}
                    value={option}
                  />
                }
                label={option}
              />
            ))}
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box mb={2}>
      <FormLabel component="legend">{question.question}</FormLabel>
      {renderQuestion()}
    </Box>
  );
};

export default Questions;
