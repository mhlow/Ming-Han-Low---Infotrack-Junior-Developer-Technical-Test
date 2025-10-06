import type { InternalProperty } from '../../types/InternalProperty';
import { useState } from 'react';
import PropertyCardModal from './PropertyCardModal';

function PropertyCard({ property }: { property: InternalProperty }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [volume, setVolume] = useState(property.volumeFolio.volume || '');
    const [folio, setFolio] = useState(property.volumeFolio.folio || '');

    return (
        <div className="property-card bg-gray-100 min-w-sm w-md min-h-48 m-8 p-6 text-black shadow-xl rounded-lg flex flex-row align-middle justify-between">
            <div className="details">
                <div className="header text-2xl">{property.fullAddress}</div>
                <div className="body text-sm my-2">
                    <p>Lot: {property.lotPlan?.lot}, Plan: {property.lotPlan?.plan}</p>
                    <p>Volume: {volume}, Folio: {folio}</p>
                    <p>Status: {property.status}</p>
                    <p>Source: {property.sourceTrace.provider}</p>
                    <p>Request ID: {property.sourceTrace.requestId}</p>
                    <p>Received At: {new Date(property.sourceTrace.receivedAt ?? '').toLocaleString()}</p>
                </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-24 h-8 rounded-md bg-cyan-300 shadow-md hover:bg-cyan-400 active:bg-cyan-500">
                Edit
            </button>
            <PropertyCardModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onConfirm={(volume, folio) => {
                    // Handle confirm action
                    setVolume(volume);
                    setFolio(folio);
                    setIsModalOpen(false);
                }}
                property={property}
            />
        </div>
    );
}

export default PropertyCard;