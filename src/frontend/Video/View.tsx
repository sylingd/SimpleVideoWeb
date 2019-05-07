import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IVideo, IComment } from 'src/types';
import { List, Avatar, Icon, Input, Button } from 'antd';
import * as dateFormat from 'dateformat';
import './View.css';

interface IVideoRouteProps {
	id: string
}

interface IVideoProps extends RouteComponentProps<IVideoRouteProps> {
}

interface IVideoState {
	id: number;
	video: IVideo;
	comments: IComment[];
	new_comment: string;
}

class Video extends React.Component<IVideoProps, IVideoState> {
	constructor(props: IVideoProps) {
		super(props);
		const id = parseInt(this.props.match.params.id, 10);
		const videos: IVideo[] = require('src/video.json');
		let currentVideo = videos[0];
		for (const it of videos) {
			if (it.id === id) {
				currentVideo = it;
				break;
			}
		}
		this.state = {
			"id": id,
			"video": currentVideo,
			"comments": require('src/comment.json'),
			"new_comment": ""
		}
	}
	public render() {
		return (
			<div className="video">
				<iframe src={`//player.bilibili.com/player.html?aid=${this.state.video.aid}"`} />
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
		)
	}
}

export default Video;