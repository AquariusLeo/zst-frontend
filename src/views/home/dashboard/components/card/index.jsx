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
              return <div className="iconfont t-card-icon">&#xe61f;</div>;
            case '订单总数':
              return <div className="iconfont t-card-icon">&#xe613;</div>;
            case '总销售额':
              return <div className="iconfont t-card-icon">&#xe61b;</div>;
            default:
              break;
          }
        })()}
      </div>
    </div>
  );
};

export default Card;
