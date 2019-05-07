import * as React from 'react';
import { Upload, Icon, message } from 'antd';
import { Image as ImageUpload } from 'src/api/upload';

interface IAppState {
	image: string;
	loading: boolean;
}

interface IAppProps {
	onUpload: (url: string) => void;
	accept?: string;
	width?: number;
	height?: number;
}

class App extends React.Component<IAppProps, IAppState> {
	public static defaultProps = {
		accept: ".jpg,.png,.gif,.webp",
		width: 200,
		height: 100
	}

	constructor(props: any) {
		super(props);
		this.state = {
			image: "",
			loading: false
		}

		this.handleRequest = this.handleRequest.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	public async handleRequest(detail: any) {
		const hide = message.loading('上传中', 0);
		this.setState({
			loading: true
		});
		const res = await ImageUpload({
			file: detail.file
		});
		hide();
		this.setState({
			loading: false
		});
		if (res instanceof Error) {
			detail.onError(res);
		} else {
			detail.onSuccess(res);
		}
	}

	public beforeUpload(file: File) {
		const isLt1M = file.size / 1024 / 1024 < 1;
		if (!isLt1M) {
			message.error('图片不能超过1MB');
		}
		return isLt1M;
	}

	public handleUpload(e: any) {
		if (e.file.status === 'error') {
			message.error(e.file.error.message);
		}
		if (e.file.status === 'done') {
			this.setState({
				image: e.file.response.url
			});
			this.props.onUpload(e.file.response.url);
		}
	}

	public render() {
		const imageUrl = this.state.image;
		const style = {
			"height": this.props.height + "px",
			"width": this.props.width + "px",
			"line-height": this.props.height + "px",
			"fontSize": ((this.props.height || 0) / 3) + "px"
		};
		const uploadButton = (
			<div style={style}>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
			</div>
		);
		return (
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				accept={this.props.accept}
				customRequest={this.handleRequest}
				beforeUpload={this.beforeUpload}
				onChange={this.handleUpload}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={style}/> : uploadButton}
			</Upload>
		)
	}
}

export default App;