import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import HomeRoute from './HomeRoute';

// 1) msw handler to intercept axios call
const handlers = [
    rest.get('/api/repositories', (req, res, ctx) => {
        const language = req.url.searchParams.get('q').split('language:')[1];

        return res(
            ctx.json({
                items: [
                    { id: 1, full_name: `${language}_one` },
                    { id: 2, full_name: `${language}_two` }
                ]
            })
        );
    })
];
// 2) code to start up the servers to start intercepting
const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => {
    server.close();
});

test('renders two links for each language', async () => {
    // 3) wrap HomeRoute with MemoryRouter because there is a Link somewhere
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    );

    // loop over each language
    const languages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];

    for (let language of languages) {
        const links = await screen.findAllByRole('link', {
            // for each make sure we see two links - using new RegExp to make it dynamic
            name: new RegExp(`${language}_`)
        });

        // assert that the links have the appropriate full_name
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
    }
});

// 4) used as a test purpose
// const pause = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 100);
//     });
// };
