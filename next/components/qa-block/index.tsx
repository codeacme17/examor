import { QuestionBlock } from "./question-block";
import { AnswerBlock } from "./answer-block";
import { QuestionType, RoleType } from "@/types/global";
import { IQuestion } from "@/types/global";

interface QABlockProps extends IQuestion {
  type: "random" | "normal";
  noteName?: string;
  onPick?: () => void;
  onBack?: () => void;
}

export const QABlock = (props: QABlockProps) => {
  const { noteName, question, roleType, type, id } = props;

  return (
    <section>
      <QuestionBlock {...props} />

      <AnswerBlock />
    </section>
  );
};
