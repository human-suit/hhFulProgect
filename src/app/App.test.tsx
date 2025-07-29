import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';

vi.mock('@widgets/', () => ({
  Header: () => <header data-testid="header">Header</header>,
  SectionSertch: () => (
    <section data-testid="search">
      <h1>Список вакансий</h1>
      <h2>по профессии Frontend-разработчик</h2>
      <input placeholder="Должность или название компании" />
      <button>Найти</button>
    </section>
  ),
  SectionFilter: () => <aside data-testid="filter">Filter Section</aside>,
  SectionList: () => <main data-testid="list">List Section</main>,
}));

describe('App component', () => {
  it('renders all main layout sections', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('SectionSertch содержит заголовки и элементы управления', () => {
    render(<App />);

    const searchSection = screen.getByTestId('search');

    expect(searchSection).toHaveTextContent(/список вакансий/i);
    expect(searchSection).toHaveTextContent(/frontend-разработчик/i);
    expect(
      screen.getByPlaceholderText(/должность или название компании/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти/i })).toBeInTheDocument();
  });

  it('Header содержит правильный текст', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toHaveTextContent('Header');
  });

  it('SectionFilter и SectionList отображаются с корректным текстом', () => {
    render(<App />);
    expect(screen.getByTestId('filter')).toHaveTextContent('Filter Section');
    expect(screen.getByTestId('list')).toHaveTextContent('List Section');
  });

  it('не содержит лишних компонентов', () => {
    render(<App />);
    expect(screen.queryAllByTestId(/header|search|filter|list/)).toHaveLength(
      4
    );
  });
});
