import * as React from 'react';
import { IVideo } from '../types';
import { Card } from 'antd';

interface IVideoListProps {
  style?: React.CSSProperties;
  value: IVideo[];
}

const VideoList = (props: IVideoListProps) => {
  const v = props.value;
  const res = v.map(e => {
    return (
      <Card
        hoverable={true}
        style={{ width: 240 }}
        cover={<img src={e.image} />}
        key={e.id}
      >
        <Card.Meta
          title={e.title}
        />
      </Card>
    )
  });
  return (
    <div>{res}</div>
  );
}

interface IHomeState {
  video: IVideo[];
}

class Home extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      video: [{
        id: 1,
        title: "[OWL每日赛事速看] 4月22日：Diya上场上海龙力克休斯顿 劫富济贫广州冲锋赢阶段首胜",
        image: "https://i2.hdslb.com/bfs/archive/5a8566eea23d8923e6e92331c4a89463be104322.jpg"
      }]
    }
  }
  public render() {
    const { video } = this.state;
    return (
      <div className="Home">
        <VideoList value={video} />
      </div>
    );
  }
}

export default Home;
