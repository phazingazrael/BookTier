import React from 'react';
import ReviewsPage from './components/ReviewPage/ReviewsPage';
import reviews from './data/demo.json';

function App() {
  return <ReviewsPage reviews={reviews} />;
}

export default App;
