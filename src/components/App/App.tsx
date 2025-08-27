import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const debounced = useDebouncedCallback((value: string) => {
    setText(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", text, page],
    queryFn: () => fetchNotes(text, page),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages || 0;
  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error("No matches found");
    }
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={text} onSearch={debounced} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            onPageChange={(selected) => setPage(selected + 1)}
            forcePage={page - 1}
            pageCount={totalPages}
          />
        )}

        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      <Toaster />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {data?.notes && !isLoading && <NoteList notes={data.notes} />}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onSuccess={() => setModalOpen(false)}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
