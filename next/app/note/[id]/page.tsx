"use client";

import { useEffect, useState } from "react";
import { useNoteStore } from "@/store";
import { IQuestion } from "@/types/global";

import { TransitionAnimate } from "@/components/transition-animate";
import { QABlock } from "@/components/qa-block";
import { NoteHeader } from "./_components/note-header";
import { QuestionTable } from "./_components/question-table";
import { NotFound } from "@/app/not-found";

const questions: IQuestion[] = [
  {
    id: "1",
    question: "What is your name?",
    answer: "My name is John Doe",
    status: "New",
    createdDate: "2024-02-02",
    updatedDate: "2024-02-02",
    questionType: "short",
    roleType: "examiner",
  },
  {
    id: "2",
    question: "What is your age?",
    answer: "I am 20 years old",
    status: "New",
    createdDate: "2024-02-02",
    updatedDate: "2024-02-02",
    questionType: "choice",
    roleType: "teacher",
  },
];

const NotePage = ({ params }: any) => {
  const { id } = params;

  const { currentNote, setCurrentNote } = useNoteStore();

  const [tab, setTab] = useState<"table" | "QA">("table");
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);

  useEffect(() => {
    if (!currentNote) getNode();
    handleGetQuestion();
  }, []);

  const getNode = async () => {
    const res = await fetch(`/api/note/${id}`);
    const json = await res.json();
    setCurrentNote(json);
  };

  const handleGetQuestion = async () => {
    const res = await fetch(`/api/note/${id}/questions`);
    const json = await res.json();
    console.log("res", json);
  };

  const handleRowClick = (question: IQuestion) => {
    setTab("QA");
    setCurrentQuestion(question);
  };

  const handleClickBack = () => {
    if (tab !== "QA") return;
    setTab("table");
  };

  if (!currentNote) return <NotFound />;

  return (
    <section>
      <NoteHeader note={currentNote} />

      {tab === "table" ? (
        <TransitionAnimate key={tab} initial={{ x: -20 }}>
          <QuestionTable questions={questions} onRowClick={handleRowClick} />
        </TransitionAnimate>
      ) : (
        currentQuestion && (
          <TransitionAnimate key={tab}>
            <QABlock onBack={handleClickBack} type="normal" {...currentQuestion} />
          </TransitionAnimate>
        )
      )}
    </section>
  );
};

export default NotePage;
