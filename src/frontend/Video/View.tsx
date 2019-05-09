import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IVideo, IComment } from 'src/types';
import { List, Avatar, Icon, Input, Button, Spin, message } from 'antd';
import * as VideoApi from 'src/api/video';
import * as dateFormat from 'dateformat';
import './View.css';

interface IVideoRouteProps {
	id: string
}

interface IVideoProps extends RouteComponentProps<IVideoRouteProps> {
}

interface IVideoState {
	loading: boolean;
	id: number;
	video: IVideo | null;
	comments: IComment[];
	new_comment: string;
}

class Video extends React.Component<IVideoProps, IVideoState> {
	constructor(props: IVideoProps) {
		super(props);
		const videoId = parseInt(this.props.match.params.id, 10);
		this.state = {
			loading: true,
			id: videoId,
			video: null,
			comments: [],
			new_comment: ""
		}
	}

	public async componentDidMount() {
		// Load video details
		const res = await VideoApi.Get({
			id: this.state.id
		});
		if (res instanceof Error) {
			message.error(res.message);
			return;
		}
		this.setState({
			loading: false,
			video: res.video
		});
	}

	public render() {
		const src = this.state.video === null ? "" : `//player.bilibili.com/player.html?aid=${this.state.video.aid}"`;
		return (
			<Spin>
				<div className="video">
					<iframe src={src} />
					<div className="left-section">
						<div className="new-comment">
							<Input.TextArea rows={3} />
							<Button>发表评论</Button>
						</div>
						<List
							className="comment"
							itemLayout="vertical"
							size="large"
							dataSource={this.state.comments}
							renderItem={item => (
								<List.Item
									key={item.id}
									actions={[(
										<span key="like-o">
											<Icon type="like-o" style={{ marginRight: 8 }} />
											{item.zan}
										</span>), (<span>
											{dateFormat(new Date(item.create_time), 'yyyy-mm-dd hh:MM:ss')}
										</span>)
									]}>
									<List.Item.Meta
										avatar={<Avatar className="avatar" src={item.user.avatar} />}
										title={item.user.name}
										description={item.body}
									/>
								</List.Item>
							)}
						/>
					</div>
					<div className="right-section">
						相关推荐
				</div>
				</div>
			</Spin>
		)
	}
}

export default Video;