import { screen, render } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays information about the repository', () => {
    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1
    };

    render(<RepositoriesSummary repository={repository} />);

    for (let key in repository) {
        const value = repository[key];
        // cannot use key value because the value will have hard coded text in the component
        // instead, use a regExp, this will look just that value and exclude the rest
        const element = screen.getByText(new RegExp(value));

        expect(element).toBeInTheDocument();
    }
});
