import './style.scss';

const Card = props => {
  const { title, nums, up } = props;
  return (
    <div className="t-card">
      <div className="t-card-left">
        <div className="t-card-title">{title}</div>
        <div className="t-card-amount">
          <strong>{nums}</strong>
        </div>
        <div className="t-card-up">
          <strong>
            同比增长{' '}
            <span
              className={
                up > 0 ? 't-card-up-increase-num' : 't-card-up-decrease-num'
              }
            >
              {up}
            </span>{' '}
            %
          </strong>
        </div>
      </div>
      <div className="t-card-right">
        {(() => {
          switch (title) {
            case '买家总数':
              return <div className="iconfont t-card-icon">&#58911;</div>;
            case '订单总数':
              return <div className="iconfont t-card-icon">&#58899;</div>;
            case '总销售额':
              return <div className="iconfont t-card-icon">&#58907;</div>;
            case '总销售数量':
              return <div className="iconfont t-card-icon">&#58998;</div>;
            default:
              break;
          }
        })()}
      </div>
    </div>
  );
};

export default Card;
