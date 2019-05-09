import * as React from 'react';
import { IVideo } from 'src/types';
import { Card, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import * as VideoApi from 'src/api/video';
import './List.css';

interface IVideoListProps {
	value: IVideo[];
}

const VideoList = (props: IVideoListProps) => {
	const v = props.value;
	const res = v.map(e => {
		return (
			<Link to={`/video/view/${e.id}`} key={e.id}>
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
		<div className="video-list">{res}</div>
	);
}

interface IAppProps {
	match: any
}

interface IAppState {
	video: IVideo[];
	loading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			video: [],
			loading: true
		}
	}
	public async componentDidMount() {
		const request = this.props.match.params.id === "all" ? VideoApi.All({}) : VideoApi.List({
			id: this.props.match.params.id
		});
		const res = await request;
		this.setState({
			loading: false
		});
		if (res instanceof Error) {
			message.error(res.message);
			return;
		}
		this.setState({
			video: res.list
		});
	}
	public render() {
		return (
			<div className="page-video-list">
				<Spin spinning={this.state.loading}>
					<VideoList value={this.state.video} />
				</Spin>
			</div>
		);
	}
}

export default App;
