import { INote, useAuth } from "@/contexts/authContext/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { da, ptBR } from "date-fns/locale";
import Dialog from "../assets/Dialog";
import { useState } from "react";
import { Edit2Icon, SaveAllIcon, TrashIcon, XIcon } from "lucide-react";
import Button from "../assets/Button";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import Loader from "../assets/Loader";
interface IProps {
  data: INote;
}

export function NoteCard({ data }: IProps) {
  const { api } = useAxios();
  const { notes, setNotes } = useAuth();
  const [openNote, setOpenNote] = useState(false);
  const [edtiting, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  function openModal() {
    setContent(data.content);
    setEditing(false);
    setOpenNote(true);
  }

  async function handleSaveEdit() {
    setLoading(true);
    try {
      const { data: editedNote }: { data: INote } = await api.put(
        "/note/" + data.id,
        { content }
      );
      const newNotes = notes.filter((item) => item.id !== data.id);
      setNotes([editedNote, ...newNotes]);
      setOpenNote(false);
      toast.success("Nota editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar a nota1");
    }
    setLoading(false);
  }

  async function handleDelete() {
    try {
      setLoading(true);
      await api.delete("/note/" + data.id);
      const newNotes = notes.filter((item) => item.id !== data.id);
      setOpenNote(false);
      setNotes([...newNotes]);
      toast.success("Nota deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar a nota!");
    }
    setLoading(false);
  }

  return (
    data && (
      <>
        <Dialog maxWidth="xl" model={[openNote, setOpenNote]}>
          {loading ? (
            <div className="py-24">
              <Loader />
            </div>
          ) : (
            <>
              <div className="text-gray-700">
                <div className="space-x-2 flex justify-between px-3">
                  {edtiting ? (
                    <p className="text-gray-400 text-sm font-medium">
                      Editando...
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm font-medium">
                      {data.createdAt &&
                        formatDistanceToNow(data.createdAt, {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </p>
                  )}
                  <div className="space-x-1">
                    {!edtiting && (
                      <>
                        <Button
                          action={() => handleDelete()}
                          theme="outline-red"
                        >
                          <TrashIcon size={18} />
                        </Button>
                        <Button
                          action={() => setEditing(true)}
                          theme="outline-blue"
                        >
                          <Edit2Icon size={18} />
                        </Button>
                      </>
                    )}
                    {edtiting && (
                      <>
                        <Button
                          action={() => setEditing(false)}
                          theme="outline-red"
                        >
                          <XIcon size={18} />
                        </Button>
                        <Button
                          action={() => handleSaveEdit()}
                          theme="outline-blue"
                        >
                          <SaveAllIcon size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-1 py-3 md:p-6 space-y-2 h-[55vh] overflow-y-auto content-preview">
                {edtiting ? (
                  <div className="size-full">
                    <textarea
                      autoFocus
                      className="size-full bg-transparent outline-none text-gray-700"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 h-full">{data.content}</p>
                  </>
                )}
              </div>
            </>
          )}
        </Dialog>
        <button
          onClick={openModal}
          className="flex flex-col text-start h-full p-6 gap-4 shadow-lg bg-gray-100 rounded-md outline-none hover:ring-2 hover:ring-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500/60"
        >
          <p className="text-gray-400 text-sm font-medium">
            {data.createdAt &&
              formatDistanceToNow(data.createdAt, {
                addSuffix: true,
                locale: ptBR,
              })}
          </p>
          <p className="text-gray-500  text-sm max-h-[168px] text-ellipsis overflow-hidden">
            {data.content}
          </p>
        </button>
      </>
    )
  );
}
