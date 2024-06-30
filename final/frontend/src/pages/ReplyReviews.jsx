import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const ReplyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [replyInputs, setReplyInputs] = useState([]);

  const baseUrl = import.meta.env.VITE_API;

  const handleReplyInputChange = (index, value) => {
    const newInputs = [...replyInputs];
    newInputs[index] = value;
    setReplyInputs(newInputs);
  };

  useEffect(() => {
    // Fetch reviews from the backend API
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseUrl}api/reviews`);
        const data = await response.json();
        setReviews(data);
        console.log(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
    console.log(reviews);
  }, []);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const handleAddReply = async (reviewId, replyContent, index) => {
    console.log(replyContent);
    try {
      const response = await fetch(`${baseUrl}reviews/${reviewId}/replies`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ replyContent }),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
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

  return (
    <>
      <NavBar />
      <div className="">
        <h2 className="text-xl font-semibold font-content ml-96  text-primecolor mt-2">
          Reply Section
        </h2>
      </div>
      <div className="lg:flex lg:flex-row lg:ml-24 lg:mt-3 font-content">
        <div className=" bg-orange-100  sm: border-4 sm: border-primecolor sm: ml-2 sm: mr-2 sm:p-2 sm: mt-3  lg:w-1/2 lg:border-4 lg:border-primecolor lg:p-4 lg: mb-2 lg:pr-4">
          {visibleReviews.map((review, index) => (
            <div key={review.id} className="mb-4">
              <p className="font-bold">{review.user_name}</p>
              <p>{review.content}</p>

              {review.replies && (
                <>
                  <div className="flex flex-row">
                    Reply by: &nbsp;
                    <p className="font-bold">{review.replied_by}</p>
                  </div>
                  <p>{review.replies}</p>
                </>
              )}
              {!review.replies && (
                <div className="ml-4 mt-2">
                  <input
                    type="text"
                    placeholder="Your reply..."
                    className="border p-2 w-full"
                    value={replyInputs[index] || ""} // Use replyInputs array for each review
                    onChange={(e) =>
                      handleReplyInputChange(index, e.target.value)
                    }
                  />
                  <button
                    className="bg-primecolor text-orange-100 p-2 mt-2 rounded-lg font-content hover:opacity-80"
                    onClick={() =>
                      handleAddReply(review.id, replyInputs[index], index)
                    }
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReplyReviews;

{
  /* <div className=" border-1 bg-green-200 md:mt-2 h-48 w-9/12 lg:ml-48 lg:mt-7 rounded-lg">
        <h1 className=" lg:text-4xl lg:ml-8 lg:mt-16">Reviews</h1>
      </div>
      <div className="mt-5">
        <Ratings />
      </div> */
}
