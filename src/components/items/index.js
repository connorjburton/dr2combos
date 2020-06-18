import { Component } from 'preact';
import orderBy from 'lodash.orderby';

class Items extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filter: ''
        };

        this.filterItems = this.filterItems.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.clearSelectedItems = this.clearSelectedItems.bind(this);
    }

    filterItems(item) {
        return item.toLowerCase().startsWith(this.state.filter);
    }

    sortItems(items) {
        return orderBy(items, (item) => this.props.selected.includes(item), ['desc']);
    }

    renderItem(item) {
        const selected = this.props.selected.includes(item);
        return (
            <li className={selected ? 'selected' : ''} onClick={() => this.props.toggle(item)}>{item} {selected ? '- Remove' : '+ Add'}</li>
        );
    }

    clearSelectedItems() {
        this.setState({ filter: '' });
        this.props.clear();
    }

	render() {
		return (
            <aside className={'items'}>
                <div className={'items-wrapper'}>
                    <div className={'search'}>
                        <input type="text" placeholder="Search items" value={this.state.filter} onKeyUp={event => this.setState({ filter: event.target.value.toLowerCase() })} />
                        <button onClick={() => this.clearSelectedItems()}>Clear</button>
                    </div>
                    <div className={'results'}>
                        <ul>
                            {this.sortItems(this.props.data.filter(this.filterItems)).map(this.renderItem)}
                        </ul>
                    </div>
                </div>
            </aside>
        );
    }
}

export default Items;
