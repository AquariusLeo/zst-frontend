import './style.scss'

const Card = (props) => {
  const titleToIcon = {
    买家总数: '&#xe61f;',
    订单总数: '&#xe613;',
    总销售额: '&#xe61b;'
  }
  return (
    <div className="t-card">
      <div className="t-card-left">
        <div className="t-card-title">{props.title}</div>
        <div className="t-card-amount">{props.nums}</div>
        <div className="t-card-up">同比增长 {props.up} %</div>
      </div>
      <div className="t-card-right">
        <span className="iconfont">{titleToIcon[props.title]}</span>
        <span className="iconfont">&#xe61b;</span>
      </div>
    </div>
  )
}

export default Card
