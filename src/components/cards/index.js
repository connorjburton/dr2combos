import { Component } from 'preact';

class Cards extends Component {

    constructor(props) {
        super(props);

        this.renderCardImages = this.renderCardImages.bind(this);
        this.onClickToggleCard = this.onClickToggleCard.bind(this);
    }


    filterCards() {
        return this.props.data.filter(card => card.items.some(item => this.props.selected.includes(item)));
    }

    onClickToggleCard(cardItems) {
        this.props.toggleCard(cardItems);
    }

    renderCardImages(cardList) {
        return cardList.sort((a, b) => a.name < b.name ? -1 : 1).map(card => {
            return (
                <div className={'image'} onClick={() => this.onClickToggleCard(card.items)}>
                    <img src={`../../assets/cards/${card.image}`} />
                </div>
            );
        })
    }


    render() {
        const cardList = this.props.selected.length > 0 ? this.filterCards(this.props.data) : this.props.data;

        return (
            <main className={'cards'}>
                <div className={'card-images'}>{this.renderCardImages(cardList)}</div>
            </main>
        );
    }
}

export default Cards;
