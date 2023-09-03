import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackNavigation from "../components/BackNavigation";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const saveBook = () => {
    const data = {
      book,
    };
    setLoading(true);
    axios
      .put("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error while updating book", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackNavigation />
      <h1 className="text-3xl my-4">Update book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) =>
              setBook((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) =>
              setBook((prevState) => ({
                ...prevState,
                author: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Published Year</label>
          <input
            type="number"
            value={book.publishedYear}
            onChange={(e) =>
              setBook((prevState) => ({
                ...prevState,
                publishedYear: e.target.value,
              }))
            }
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></input>
        </div>
        <button className="p-2 bg-sky-300 m-8 " onClick={saveBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
