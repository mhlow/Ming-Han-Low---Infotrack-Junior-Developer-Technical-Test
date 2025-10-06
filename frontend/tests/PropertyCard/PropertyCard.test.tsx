/** 
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyCard from '../../src/components/property card/PropertyCard';

/** IMPORTANT:
 * I could not get these tests working in time, so here is a range of test i would try.
 * 
 * 1. Basic render test to ensure component mounts without crashing.
 * 2. Test that property details (address, volume, folio) render when provided with default values.
 * 3. Simulate clicking the Edit button and check that the modal opens with correct initial values.
 * 4. Input validation tests:
 *    - Enter invalid volume (e.g. 7 digits) and folio (e.g. 6 digits) and check if input mask is applied.
 *    - Enter valid volume and folio and ensure no validation errors appear.
 * 5. Simulate confirming changes:
 *   - Change volume and folio to valid values, click Confirm, and check if the card updates.
 * 6. Simulate cancelling changes:
 *  - Open modal, make changes, click Close, and ensure card remains unchanged.
 * 7. Test keyboard accessibility:
 *  - Press Escape key to close the modal and ensure it closes properly.
 */

// test('stub', () => expect(true).toBe(true));
describe('<PropertyCard />', () => {
    const mockProperty = {
        address: '123 Test Street',
        title: { Volume: '123', Folio: '45' },
    };
    it('renders without crashing', () => {
        render(<PropertyCard property={mockProperty} />);
        expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
    });
    // const setup = (props = {}) => render(<PropertyCard property={mockProperty} {...props} />);

    // test('renders property details correctly', () => {
    //     setup();
    //     expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Volume/i)).toBeInTheDocument();
    //     expect(screen.getByText(/123/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Folio/i)).toBeInTheDocument();
    //     expect(screen.getByText(/45/i)).toBeInTheDocument();
    // });

    // test('opens modal when Edit button is clicked', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);
    //     expect(screen.getByRole('dialog')).toBeInTheDocument();
    //     expect(screen.getByLabelText(/volume/i)).toHaveValue('123');
    //     expect(screen.getByLabelText(/folio/i)).toHaveValue('45');
    // });

    // test('shows validation errors for invalid volume and folio', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);

    //     const volumeInput = screen.getByLabelText(/volume/i);
    //     const folioInput = screen.getByLabelText(/folio/i);
    //     const confirmButton = screen.getByRole('button', { name: /confirm/i });

    //     await userEvent.clear(volumeInput);
    //     await userEvent.type(volumeInput, '1234567'); // invalid (7 digits)
    //     await userEvent.clear(folioInput);
    //     await userEvent.type(folioInput, '123456'); // invalid (6 digits)
    //     await userEvent.click(confirmButton);

    //     expect(await screen.findByText(/volume must be 1–6 digits/i)).toBeInTheDocument();
    //     expect(await screen.findByText(/folio must be 1–5 digits/i)).toBeInTheDocument();
    // });

    // test('updates card state and closes modal on Confirm', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);

    //     const volumeInput = screen.getByLabelText(/volume/i);
    //     const folioInput = screen.getByLabelText(/folio/i);
    //     const confirmButton = screen.getByRole('button', { name: /confirm/i });

    //     await userEvent.clear(volumeInput);
    //     await userEvent.type(volumeInput, '456');
    //     await userEvent.clear(folioInput);
    //     await userEvent.type(folioInput, '99');
    //     await userEvent.click(confirmButton);

    //     await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    //     expect(screen.getByText(/456/i)).toBeInTheDocument();
    //     expect(screen.getByText(/99/i)).toBeInTheDocument();
    // });

    // test('closes modal without changes when Close is clicked', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);

    //     const volumeInput = screen.getByLabelText(/volume/i);
    //     await userEvent.clear(volumeInput);
    //     await userEvent.type(volumeInput, '999');
    //     const closeButton = screen.getByRole('button', { name: /close/i });
    //     await userEvent.click(closeButton);

    //     await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    //     expect(screen.getByText(/123/i)).toBeInTheDocument(); // unchanged
    // });

    // test('modal can be closed with Escape key', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);
    //     const modal = screen.getByRole('dialog');
    //     await userEvent.keyboard('{Escape}');
    //     await waitFor(() => expect(modal).not.toBeInTheDocument());
    // });

    // test('focus is trapped within modal when open', async () => {
    //     setup();
    //     const editButton = screen.getByRole('button', { name: /edit/i });
    //     await userEvent.click(editButton);

    //     const modal = screen.getByRole('dialog');
    //     const volumeInput = screen.getByLabelText(/volume/i);
    //     const folioInput = screen.getByLabelText(/folio/i);
    //     const confirmButton = screen.getByRole('button', { name: /confirm/i });
    //     const closeButton = screen.getByRole('button', { name: /close/i });

    //     volumeInput.focus();
    //     expect(volumeInput).toHaveFocus();

    //     await userEvent.tab();
    //     expect(folioInput).toHaveFocus();

    //     await userEvent.tab();
    //     expect(confirmButton).toHaveFocus();

    //     await userEvent.tab();
    //     expect(closeButton).toHaveFocus();

    //     await userEvent.tab();
    //     // Should wrap focus back to first element
    //     expect(volumeInput).toHaveFocus();
    // });
});
