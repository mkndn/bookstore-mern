import { useState } from "react";
import BackNavigation from "../components/BackNavigation";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        console.log("Book deleted successfully");
        setLoading(false);
        enqueueSnackbar(`Book with id ${id} deleted successfully`, {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar(`Error while deleting book with id ${id}`, {
          variant: "error",
        });
      });
  };

  const noDelete = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <BackNavigation />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete the book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={deleteBook}
        >
          Yes
        </button>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={noDelete}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
