import React from 'react';
// import './ReviewCard.css';
// import './cosmiccoding.main.css'
import './FancyCard.css'

function ReviewCard({ review }) {
  return (
    <>
      {/* <div className="review-card fancy_card horizontal mx-auto">
        <figure className="block flex-none bg-cover ">
          <picture>
            <img src={review.img} alt={review.title} />
          </picture>
        </figure>
        <div className="review-content flex flex-col justify-between p-4 text-center side-card-content">
          <h2 className="review-title">{review.title}</h2>
          <p className="review-author">by {review.author}</p>
          <p className="review-sentence">{review.sentence}</p>
          <p className="review-description">{review.description}</p>
          <div className="review-tags">
            {review.tags.map(tag => (
              <span className="review-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <p className="review-date">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div> */}
      <div className="fancy_card horizontal mx-auto">
        <div className="card_translator">
          <div className="card_rotator small_rot card_layer block">
            <div className="card_layer">
              <article className={`review-summary review-${review.review}`}>
                <div className="bg2">
                  <div className="bg-inner flex flex-col md:flex-row w-full bg-gray-800">
                    <figure className="block flex-none bg-cover ">
                      <picture>
                        <source srcSet={review.img} />
                        <img loading="lazy" className="block flex-none bg-cover mx-auto md:rounded-l-xl" src={review.img} width="250" height="400" alt={review.title}></img>
                      </picture>
                    </figure>
                    <div className="flex flex-col justify-between p-4 text-center">
                      <div className="rating">
                        <p className="small rating-π">
                          <span className="leader">{review.title}</span>
                        </p>
                      </div>
                      <p className="text-lg text-gray-400 px-3">
                        Determined to fix her soul, Raysha ventures out into the world only to stumble into events larger than she realises.
                      </p>
                      <div>
                        <div className="mb-3">
                          <ul className="flex flex-wrap text-xs font-medium -m-1 justify-center">
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-companion">companion</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-cultivation">cultivation</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-female-lead">female-lead</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-hard-magic">hard-magic</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-in-progress">in-progress</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-lgbt">lgbt</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-amazon">amazon</li>
                            <li className="m-1 inline-flex text-center py-1 px-3 rounded-full tag-audio">audio</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="card_layer card_effect card_overlay_π"></div>
            <div className="card_layer card_effect card_glare"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
