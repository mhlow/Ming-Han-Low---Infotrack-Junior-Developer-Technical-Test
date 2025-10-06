import PropertyCardButton from '../../components/property card/PropertyCardButton';

function App() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div>
            <div className="m-8 p-8">
                {cards.map((card) => (
                    <PropertyCardButton key={card} />
                ))}
            </div>
        </div>
    )
}

export default App
