import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewsPage.css';

function ReviewsPage({ reviews }) {
  return (
    <div className="reviews-page">
      <div className="reviews-grid">
        {reviews.map(r => (
          <ReviewCard key={r.link} review={r} />
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
