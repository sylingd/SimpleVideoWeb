import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IVideo } from '../types';
import './Video.css';

interface IVideoRouteProps {
	id: string
}

interface IVideoProps extends RouteComponentProps<IVideoRouteProps> {
}

interface IVideoState {
	id: number;
	video: IVideo;
}

class Video extends React.Component<IVideoProps, IVideoState> {
	constructor(props: IVideoProps) {
		super(props);
		const id = parseInt(this.props.match.params.id, 10);
		const videos: IVideo[] = require('../video.json');
		let currentVideo = videos[0];
		for (const it of videos) {
			if (it.id === id) {
				currentVideo = it;
				break;
			}
		}
		this.state = {
			"id": id,
			"video": currentVideo
		}
	}
	public render() {
		return (
			<div className="video">
				<iframe src={`//player.bilibili.com/player.html?aid=${this.state.video.aid}&cid=${this.state.video.cid}"`} />
			</div>	  
		)
	}
}

export default Video;