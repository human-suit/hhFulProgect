import { Vacancy } from '@/shared/types/vacancy';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SearchParams = {
  text: string;
  city?: string;
  skills?: string[];
};

export const fetchVacancies = createAsyncThunk<Vacancy[], SearchParams>(
  'vacancies/fetchVacancies',
  async ({ text, city = '', skills = [] }) => {
    let query = `https://api.hh.ru/vacancies?industry=7&text=${encodeURIComponent(text)} `;

    if (skills.length) {
      const skillQuery = skills.map((s) => encodeURIComponent(s)).join(' ');
      query += `${skillQuery}`;
    }
    if (city && city !== 'all') {
      query += `&area=${city === 'Москва' ? 1 : city === 'Санкт-Петербург' ? 2 : ''}`;
    }

    const res = await fetch(query);
    const data = await res.json();
    return data.items as Vacancy[];
  }
);

interface VacanciesState {
  list: Vacancy[];
  loading: boolean;
  error: string | null;
}

const initialState: VacanciesState = {
  list: [],
  loading: false,
  error: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vacanciesSlice.reducer;
