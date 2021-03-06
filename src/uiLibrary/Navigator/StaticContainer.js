/**
 *
 * 非栈顶不进行渲染
 */
import React, {
    PropTypes
} from 'react';

export default class StaticContainer extends React.Component {
    static propTypes = {
        isActive: PropTypes.bool.isRequired
    };

    shouldComponentUpdate(nextProps: Object): boolean {
        return this.props.isActive !== nextProps.isActive;
    }

    render() {
        let {children} = this.props;
        return children ? React.Children.only(children) : null;
    }
}
