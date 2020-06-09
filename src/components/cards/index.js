import { Component } from 'preact';

const Cards = (props) => {
    const items = props.selected.length > 0 ? props.data.filter(card => card.weapons.some(weapon => props.selected.includes(weapon))) : props.data; 

    return (
        <main className={'cards'}>
            <div className={'search'}>
                <input type="text" placeholder="Search combo cards" />
            </div>
            <div className={'card-images'}>
                {items.sort((a, b) => a.name < b.name ? -1 : 1).map(item => <div className={'image'}><img src={`../../assets/cards/${item.image}`} /></div>)}
            </div>
        </main>
    );
}

export default Cards;
