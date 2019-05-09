import * as React from 'react';
import { Icon, Form, Input } from 'antd';

interface IAppProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	placeholder: string;
	icon: string;
	value?: string;
}

interface IAppState {
	value: string;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value || ""
		};
		this.onChange = this.onChange.bind(this);
	}
	public componentWillReceiveProps(props: any) {
		if (typeof(props.value) !== "undefined" && props.value !== this.state.value) {
			this.setState({
				value: props.value
			});
		}
	}
	public onChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			value: e.target.value
		});
		this.props.onChange(e);
	}
	public render() {
		return (
			<Form.Item>
				<Input name={this.props.name} prefix={<Icon type={this.props.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.placeholder} onChange={this.onChange} value={this.state.value} />
			</Form.Item>
		);
	}
}

export default App;