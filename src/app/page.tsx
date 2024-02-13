"use client";
import { useState } from "react";
import { MicIcon, Newspaper, Save } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import Dialog from "@/components/assets/Dialog";
import { toast } from "sonner";
import { NoteCard } from "@/components/notes/NoteCard";
import { INote, useAuth } from "@/contexts/authContext/AuthContext";
import Button from "@/components/assets/Button";
let speechRecognition: SpeechRecognition;
export default function App() {
  const { api } = useAxios();
  const { notes, setNotes } = useAuth();
  const [createNoteDialog, setCreateNoteDialog] = useState(false);
  const [recording, setRecording] = useState(false);
  const [content, setContent] = useState("");

  async function handleSubmit() {
    if (content === "") {
      toast.error("O conteúdo da nota não pode ser vazio");
      return;
    }
    try {
      const { data: newNote }: { data: INote } = await api.post("/note", {
        content,
      });
      setNotes([newNote, ...notes]);
      setCreateNoteDialog(false);
      toast.success("Nota criada com sucesso");
      setContent("");
    } catch (error) {
      toast.error("Erro ao criar a nota");
    }
  }

  function handleStartRecord() {
    const isSpeechRecognitionAPIAvaible =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvaible) {
      toast.error("Infelizmente seu navegador não suporta a API de gravação!");
      return;
    }

    setRecording(true);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.continuous = true;
    speechRecognition.lang = "pt-BR";
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");
      if (content === "") {
        setContent(transcription);
      } else {
        setContent(content + " " + transcription);
      }
    };

    speechRecognition.onerror = (e) => {
      console.log(e);
      toast.error(e.toString());
    };

    speechRecognition.onend = () => {
      setRecording(false);
    };

    speechRecognition.start();
  }

  function handleStopRecord() {
    console.log("stop");
    setRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.onerror = (e) => {
        console.log(e);
        toast.error(e.toString());
      };
      speechRecognition.stop();
    }
  }
  return (
    <>
      <Dialog maxWidth="xl" model={[createNoteDialog, setCreateNoteDialog]}>
        <form className="bg-gray-100 md:p-6 flex flex-col rounded-md ">
          <h2 className="font-medium text-gray-500 text-xl flex gap-2">
            <Newspaper />
            Crie uma nota
          </h2>
          <div className="flex justify-end items-center">
            <div className="space-x-1">
              {recording ? (
                <Button
                  action={() => handleStopRecord()}
                  submit
                  theme="outline-red"
                >
                  <div className="p-1">
                    <div className="size-4 rounded-full bg-red-500 animate-pulse" />
                  </div>
                </Button>
              ) : (
                <Button
                  action={() => handleStartRecord()}
                  submit
                  theme="outline-blue"
                >
                  <MicIcon />
                </Button>
              )}
              <Button action={() => handleSubmit()} submit theme="outline-blue">
                <Save />
              </Button>
            </div>
          </div>
          <label className="space-y-1 py-2">
            <textarea
              autoFocus
              placeholder="Digite o conteúdo aqui ou clique no microfone para gravar a nota via áudio."
              className="outline-none bg-gray-200/60 rounded p-3 md:p-6 text-gray-700 text-sm resize-none h-64 w-full placeholder:text-gray-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </form>
      </Dialog>
      <main className="p-4 md:px-12 md:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] w-full gap-5">
        <button
          className="flex flex-col text-start h-full p-6 gap-4 bg-gray-200 rounded-md outline-none hover:ring-2 hover:ring-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500/60"
          onClick={() => setCreateNoteDialog(true)}
        >
          <p className="text-gray-500 text-sm font-medium">Adicionar nota</p>
          <p className="text-gray-500 text-sm">
            Grave uma nota em áudio que será convertida automaticamente.
          </p>
        </button>
        {notes.map((note, index) => (
          <NoteCard key={index} data={note} />
        ))}
      </main>
    </>
  );
}
