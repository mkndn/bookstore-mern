import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackNavigation from "../components/BackNavigation";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
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

  return (
    <div className="p-4">
      <BackNavigation />
      <h1 className="text-3xl my-4">Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">id</span>
            <span>{book._id}</span>
          </div>
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">Published Year</span>
            <span>{book.publishedYear}</span>
          </div>
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="p-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Updated Time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
