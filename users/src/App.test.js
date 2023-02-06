import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', () => {
    render(<App />);

    // i = case insensitivity, ignore uppercase lowercase letters
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button');

    user.click(nameInput);
    user.keyboard('jane');
    user.click(emailInput);
    user.keyboard('jane@gmail.com');

    user.click(button);

    // EXCELLENT debug tool which will show you the body
    // screen.debug();

    const name = screen.getByRole('cell', { name: 'jane' });
    const email = screen.getByRole('cell', { name: 'jane@gmail.com' });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});
