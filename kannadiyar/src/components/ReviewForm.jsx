import React, { useState, useEffect } from "react";

const ReviewForm = () => {
  const custId = sessionStorage.getItem("custId");
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState();
  const baseurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // Fetch reviews from the backend API
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseurl}api/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
    console.log(reviews);
  }, []);

  const [isGuestMode, setIsGuestMode] = useState(false);
  useEffect(() => {
    const custId = sessionStorage.getItem("custId");
    if (custId === "0" || custId === null) {
      setIsGuestMode(true);
    }
  }, []);

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [newReview, setNewReview] = useState({
    user: "",
    content: "",
  });

  const handleAddReview = async () => {
    if (content) {
      try {
        // Make a POST request to add a new review
        const response = await fetch(`${baseurl}api/reviews`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user: custId, content: content }),
        });
        const addedReview = await response.json();

        // Update reviews state with the newly added review
        setReviews([...reviews, addedReview]);
        setContent("");
      } catch (error) {
        console.error("Error adding review:", error);
      }
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
      <div className="lg:flex lg:flex-row lg:ml-48 lg:mt-3">
        {isGuestMode ? (
          <>
            <div className="sm: border-2 sm: border-gray-500 sm: ml-2 sm: mr-2 sm: p-2 sm: mt-3 lg:w-1/3 lg:border-2 lg:border-gray-500 lg:mb-2">
              <h1>You are in guest mode</h1>
            </div>
          </>
        ) : (
          <div className="sm: border-2 sm: border-primecolor lg:h-64 sm: ml-2 sm: mr-2 sm: p-2 sm: mt-3 lg:w-1/3 lg:border-2 lg:border-primecolor lg:mb-2">
            <p className="font-bold font-content text-primecolor mb-4">
              Leave a Review
            </p>
            <textarea
              placeholder="Your review..."
              className="border p-2 w-full mb-2"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              className="sm: bg-primecolor sm: rounded-lg sm: p-2 sm: text-orange-100 lg:bg-primecolor lg:text-orange-100 hover:opacity-75 "
              onClick={handleAddReview}
            >
              Submit Review
            </button>
          </div>
        )}
        <div className="  sm: border-4 sm: border-primecolor sm: ml-2 sm: mr-2 sm: p-2 sm: mt-3  lg:w-1/2 lg:border-8 lg:border-primecolor lg:p-4 lg: mb-2 lg:pr-4">
          {visibleReviews.length == 0 ? (
            <>
              <p className="font-content text-primecolor">No reviews yet</p>
            </>
          ) : (
            <>
              {visibleReviews.map((review) => (
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
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
