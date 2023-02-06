import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'; //simulates clicking and typing

import UserForm from './components/UserForm';

test('it shows two inputs and a button', () => {
    // 1) render the component
    render(<UserForm />);

    // 2) Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // 3) Assertion -make sure the component is doing what we expect it to do
    // expect is provided by jest
    // toHaveLength is called a matcher
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
    // NOT THE BEST IMPLEMENTATION - below is just to know
    // ***
    // const argList = [];
    // const callback = (...args) => {
    //     argList.push(args);
    // };

    // BETTER WAY - making use of jest.fn() function
    const mock = jest.fn();

    // render my component
    render(<UserForm onUserAdd={mock} />);

    // find the two inputs
    // issue here is we're assuming there will never be a change.
    // NOTE: forms may change through time adding/reorder/rename.  thus this commented const will be brittle
    // const [nameInput, emailInput] = screen.getAllByRole('textbox');

    // BETTER WAY - using screen.getByRole with regex
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    // simulate typeing in a name
    user.click(nameInput);
    user.keyboard('jane');

    // simulate typing in an email
    user.click(emailInput);
    user.keyboard('jane@gmail.com');

    // find the button
    const button = screen.getByRole('button');

    // simulate clicking the button
    user.click(button);

    // assertion to make sure 'onUserAdd' gets called with email/name
    // NOT THE BEST IMPLEMENTATION - below is just to know
    // ***
    // expect(argList).toHaveLength(1);
    // expect(argList[0][0]).toEqual({ name: 'jane', email: 'jane@gmail.com' });

    // BETTER WAY - making use of jest.fn() function
    expect(mock).toHaveBeenCalled(); //this will work because it keeps a count on how many times called
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@gmail.com' });
});
