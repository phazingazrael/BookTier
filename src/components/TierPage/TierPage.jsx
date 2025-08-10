import './TierPage.css';

//function TierPage({ reviews }) {
function TierPage() {
  return (
    <div className="tier-container">
      <div className="tier-s">
        <div className="row-container">
          <div className="tier-header">
            <div>S</div>
          </div>
          <div className="tier-list">{/* map over s tier*/}</div>
        </div>
        <div className="tier-divider" />
      </div>
      <div className="tier-a">
        <div className="row-container">
          <div className="tier-header">
            <div>A</div>
          </div>
          <div className="tier-list">{/* map over a tier*/}</div>
        </div>
        <div className="tier-divider" />
      </div>
      <div className="tier-b">
        <div className="row-container">
          <div className="tier-header">
            <div>B</div>
          </div>
          <div className="tier-list">{/* map over b tier*/}</div>
        </div>
        <div className="tier-divider" />
      </div>
      <div className="tier-c">
        <div className="row-container">
          <div className="tier-header">
            <div>C</div>
          </div>
          <div className="tier-list">{/* map over c tier*/}</div>
        </div>
        <div className="tier-divider" />
      </div>
      <div className="tier-d">
        <div className="row-container">
          <div className="tier-header">
            <div>D</div>
          </div>
          <div className="tier-list">{/* map over d tier*/}</div>
        </div>
        <div className="tier-divider" />
      </div>
      <div className="tier-f">
        <div className="row-container">
          <div className="tier-header">
            <div>F</div>
          </div>
          <div className="tier-list">{/* map over f tier*/}</div>
        </div>
      </div>
    </div>

  );
}

export default TierPage;
