import { render, screen } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
// 3) in order to pass it, we have to add a MemoryRouter even though we dont need the Link
import { MemoryRouter } from 'react-router-dom';

// 8) can also be fixed by skipping the useEffect call completly by
// pretend of the contents of another file ----- POWERFUL because it did intercept the call to the file
// and run this instead.... WHAT!!!?!?!?!
// only use if you dont care about rendering the other component at all
// jest.mock('../tree/FileIcon', () => {
//     return () => {
//         console.log('SF - did this override?');
//         return 'File Icon Component';
//     };
// });

// 9) AVOID using the act fuction - not professional

const renderComponent = () => {
    const repository = {
        full_name: 'facebook/react',
        language: 'Javascript',
        description: 'A js library',
        owner: 'facebook',
        name: 'react',
        html_url: 'https://github.com/facebook/react'
    };
    render(
        // 3) wrap the component with MemoryRouter - fixed...
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    );

    return { repository };
};

// 4) there still an issue - act warning because of a promise.... to fix add async
test('shows a link to the github homepage for this repository', async () => {
    // 1) will fail, EXCELLENT example because there is a Link being used in the component

    const { repository } = renderComponent();

    // 6) add the following - just to see the data after a pause
    // screen.debug();
    // await pause();
    // screen.debug();

    // 7) overall!!!!!! this line will fix the act warning and pass your tests
    await screen.findByRole('img', { name: 'Javascript' });

    // 10) final fix updated renderComponent to return data so that I can grab it here instead of copy paste strings
    // 11) added accessible name so that test would fail properly
    const link = screen.getByRole('link', {
        name: /github repository/i
    });
    expect(link).toHaveAttribute('href', repository.html_url);
});

// 5) create a pause function
const pause = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
};
