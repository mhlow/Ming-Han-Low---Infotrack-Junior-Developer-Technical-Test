import PropertyCard from '../../components/property card/PropertyCard';
import type { InternalProperty } from '../../types/InternalProperty';

function App() {
    // Example property data
    const cards: InternalProperty[] = [
        {
            fullAddress: '123 Main St, Sydney NSW',
            lotPlan: { lot: '12', plan: '34' },
            volumeFolio: { volume: '56', folio: '78' },
            status: 'KnownVolFol',
            sourceTrace: { provider: 'TestProvider', requestId: 'REQ123', receivedAt: new Date().toISOString() },
        },
        {
            fullAddress: '456 Park Ave, Melbourne VIC',
            lotPlan: { lot: '12', plan: '34' },
            volumeFolio: { volume: '56', folio: '78' },
            status: 'KnownVolFol',
            sourceTrace: { provider: 'TestProvider', requestId: 'REQ123', receivedAt: new Date().toISOString() },
        },
        {
            fullAddress: '789 Beach Rd, Brisbane QLD',
            lotPlan: { lot: '12', plan: '34' },
            volumeFolio: { volume: '56', folio: '78' },
            status: 'KnownVolFol',
            sourceTrace: { provider: 'TestProvider', requestId: 'REQ123', receivedAt: new Date().toISOString() },
        },
        {
            fullAddress: '789 Beach Rd, Brisbane QLD',
            lotPlan: { lot: '12', plan: '34' },
            volumeFolio: { volume: '56', folio: '78' },
            status: 'KnownVolFol',
            sourceTrace: { provider: 'TestProvider', requestId: 'REQ123', receivedAt: new Date().toISOString() },
        },
    ];

    return (
        <div>
            <div className="m-8 p-8 flex flex-wrap">
                {cards.map((card, index) => (
                    <PropertyCard key={index} property={card} />
                ))}
            </div>
        </div>
    )
}

export default App
