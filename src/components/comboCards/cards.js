import { Component } from 'preact';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.renderCardImages = this.renderCardImages.bind(this);
        this.onClickToggleCard = this.onClickToggleCard.bind(this);
        this.filterCard = this.filterCard.bind(this);
    }

    filterCard(card) {
        return card.items.some(item => this.props.selected.includes(item));
    }

    onClickToggleCard(cardItems) {
        this.props.toggleCard(cardItems);
    }

    renderCardImages(cardList) {
        return cardList.map(card => ({...card, isFiltered: this.filterCard(card)})).sort((a, b) => {
            return a.isFiltered && !b.isFiltered ? -1 : !a.isFiltered && b.isFiltered ? 1 : a.name < b.name ? -1 : 1;
        }).map(card => {
            const isSelected = this.props.selected.length > 0 ? card.isFiltered : true;
            return (
                <div className={'image'} onClick={() => this.onClickToggleCard(card.items)}>
                <div class={`card-name ${this.props.selected.length > 0 && !card.isFiltered ? 'filtered-out' : ''}`}>{card.name}</div>
                    <div className="card-items">{card.items.map(item => (<div>{item}</div>))}</div>
                    <img src={`../../assets/cards/${isSelected ? card.image : card.filteredImage}`} title={card.name} />
                </div>
            );
        })
    }

    render() {
        return (
            <div className={'cards'}>
                <div className={'card-images'}>{this.renderCardImages(this.props.data)}</div>
            </div>
        );
    }
}

export default Cards;
