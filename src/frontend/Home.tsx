import * as React from 'react';
import { IVideo } from 'src/types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface IVideoListProps {
	value: IVideo[];
}

const VideoList = (props: IVideoListProps) => {
	const v = props.value;
	const res = v.map(e => {
		return (
			<Link to={`/video/${e.id}`} key={e.id}>
				<Card
					hoverable={true}
					style={{ width: 240 }}
					cover={<img src={e.image} />}>
					<Card.Meta
						title={e.title}
					/>
				</Card>
			</Link>
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
			video: require('src/video.json')
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
