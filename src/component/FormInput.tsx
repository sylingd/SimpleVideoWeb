import * as React from 'react';
import { Icon, Form, Input } from 'antd';

interface IAppProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	placeholder: string;
	icon: string;
	value?: string;
}

class App extends React.Component<IAppProps, {}> {
	public render() {
		return (
			<Form.Item>
				<Input name={this.props.name} prefix={<Icon type={this.props.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value || ""} />
			</Form.Item>
		);
	}
}

export default App;