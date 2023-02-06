import { render, screen, within } from '@testing-library/react';
import UserList from './components/userList';

test('render one row per user - preferred way', () => {
    // Render the component
    const users = [
        { name: 'jane', email: 'jane@gmail.com' },
        { name: 'sam', email: 'sam@gmail.com' }
    ];

    render(<UserList users={users} />);

    // NICE playground that finds all the rows in a table
    // screen.logTestingPlaygroundURL();
    const rows = screen.getAllByRole('row');

    // Assertion: correct number of rows in the table
    // BIG NOTE: there is actually two rows, however the third counted is the header
    expect(rows).toHaveLength(3);
});

// BIG NOTE: Stephen Grider did not like this because - code would need to be modified only
test('render one row per user  Fallback #1', () => {
    // Render the component
    const users = [
        { name: 'jane', email: 'jane@gmail.com' },
        { name: 'sam', email: 'sam@gmail.com' }
    ];

    render(<UserList users={users} />);

    // NICE playground that finds all the rows in a table
    // screen.logTestingPlaygroundURL();
    const rows = within(screen.getByTestId('users')).getAllByRole('row');

    // modify userList.js to have an extra attribute
    // ex: <tbody data-testid='users'>

    // Assertion: correct number of rows in the table
    // to accomodate the test to work
    expect(rows).toHaveLength(2);
});

// BIG NOTE: stephen grider likes this version instead
test('render one row per user Fallback #2', () => {
    // Render the component
    const users = [
        { name: 'jane', email: 'jane@gmail.com' },
        { name: 'sam', email: 'sam@gmail.com' }
    ];

    const { container } = render(<UserList users={users} />);

    const table = container.querySelector('table');

    // NICE playground that finds all the rows in a table
    // screen.logTestingPlaygroundURL();
    const rows = container.querySelectorAll('tbody tr');

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});
