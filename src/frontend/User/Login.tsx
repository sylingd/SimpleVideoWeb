import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser } from '../../types';
import { setUser } from '../../state/actions';

interface IAppProps {
	setUser?: any;
	user: IUser | null;
}

class App extends React.Component<IAppProps> {
	public render() {
		console.log(this.props);
		// const { user } = this.props;
		return (
			<div className="Login">AAA</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setUser: (to: IUser | null) => dispatch(setUser(to))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);