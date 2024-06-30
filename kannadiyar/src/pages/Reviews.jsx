import { useEffect } from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import React, { useState} from "react";
import GreenThing from "../components/GreenThing";
import ReivewForm from "../components/ReviewForm";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      content: "This is a great product!",
      replies: [
        { id: 101, user: "Alice", content: "I agree!" },
        { id: 102, user: "Bob", content: "Tell me more about it." },
        { id: 103, user: "Bob", content: "Tell me more about it." },
      ],
    },
  ]);

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [newReview, setNewReview] = useState({
    user: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setNewReview((prevNewReview) => ({
      ...prevNewReview,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddReview = () => {
    if (newReview.user && newReview.content) {
      const updatedReviews = [
        ...reviews,
        {
          id: Date.now(),
          user: newReview.user,
          content: newReview.content,
          replies: [],
        },
      ];

      setReviews(updatedReviews);

      // Clear the form
      setNewReview({
        user: "",
        content: "",
      });
    }
  };

  const handleAddReply = (reviewId, replyContent) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replies: [
                ...review.replies,
                {
                  id: Date.now(),
                  user: "Current User", // Replace with actual user info
                  content: replyContent,
                },
              ],
            }
          : review
      )
    );
  };

  useEffect(() => {
    const loadMoreReviews = () => {
      const endIndex = startIndex + 10;
      const newVisibleReviews = reviews
        .slice(startIndex, endIndex)
        .filter((review) => {
          // Check if the review is not already present in visibleReviews
          return !visibleReviews.some(
            (visibleReview) => visibleReview.id === review.id
          );
        });

      if (newVisibleReviews.length > 0) {
        setVisibleReviews((prevVisibleReviews) => [...newVisibleReviews]);
        setStartIndex(endIndex);
      }
    };

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMoreReviews();
      }
    };

    window.addEventListener("scroll", handleScroll);

    loadMoreReviews();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [reviews, startIndex]);

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Unauthorized access");
      navigate("/");
    }
  }, []);

  return (
    <>
    <Topnavbar/>
    <GreenThing header={"Review Page"} />
   <ReivewForm/>
    <Footer/>
    </>
  );
};

export default Reviews;
