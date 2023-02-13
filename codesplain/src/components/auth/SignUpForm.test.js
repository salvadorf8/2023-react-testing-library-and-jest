import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SignUpForm from './SignUpForm';

test('contains six elements on the page', () => {
    render(
        <MemoryRouter>
            <SignUpForm />
        </MemoryRouter>
    );

    const email = screen.getByRole('textbox', { name: /email/i });
    const password = screen.getByTestId('Password');
    const confirmPassword = screen.getByTestId('confirm-Password');
    const button = screen.getByRole('button');
    const link = screen.getByRole('link', /sign in/i);
    const checkbox = screen.getByRole('checkbox');

    expect(email).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
});
