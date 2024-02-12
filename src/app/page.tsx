"use client";
import { FormEvent, useState } from "react";
import { Newspaper } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import FormButton from "@/components/assets/FormButton";
import Dialog from "@/components/assets/Dialog";
import { toast } from "sonner";
import { NoteCard } from "@/components/notes/NoteCard";
import { INote, useAuth } from "@/contexts/authContext/AuthContext";
export default function App() {
  const { api } = useAxios();
  const { notes, setNotes } = useAuth();
  const [createNoteDialog, setCreateNoteDialog] = useState(false);
  const [form, setForm] = useState({
    content: "",
  });

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      const { data: newNote }: { data: INote } = await api.post("/note", form);
      setNotes([newNote, ...notes]);
      setCreateNoteDialog(false);
      toast.success("Nota criada com sucesso");
      setForm({ content: "" });
    } catch (error) {
      toast.error("Erro ao criar a nota");
    }
  }
  return (
    <>
      <Dialog maxWidth="xl" model={[createNoteDialog, setCreateNoteDialog]}>
        <form
          className="bg-gray-100 p-6 flex flex-col rounded-md "
          onSubmit={handleSubmit}
        >
          <h2 className="pb-4 font-medium text-gray-500 text-xl flex gap-2">
            <Newspaper />
            Crie uma nota
          </h2>
          <label className="space-y-1 py-2">
            <textarea
              placeholder="Digite o conteúdo aqui"
              className="outline-none bg-gray-200 rounded p-6 text-gray-700 resize-none h-64 w-full placeholder:text-gray-400"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </label>

          <FormButton submit>enviar</FormButton>
        </form>
      </Dialog>
      <main className="px-12 py-8 grid grid-cols-3 auto-rows-[250px] w-full gap-5">
        <button
          className="flex flex-col text-start h-full p-6 gap-4 bg-gray-200 rounded-md outline-none hover:ring-2 hover:ring-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500/60"
          onClick={() => setCreateNoteDialog(true)}
        >
          <p className="text-gray-500 text-sm font-medium">Adicionar nota</p>
          <p className="text-gray-500 ">
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
