import { groupTeamCards } from './index';

describe('groupTeamCards', () => {
  it('groups non-legacy mentors by year and separates legacy mentors', () => {
    const cards = [
      { name: 'Alice Active', year: 2026, legacy: false },
      { name: 'Bob Active', year: '2025', legacy: false },
      { name: 'Legacy Mentor', year: 2024, legacy: true },
      { name: 'Another Legacy', isLegacy: true },
      { name: 'No Year', legacy: false },
    ];

    const result = groupTeamCards(cards);

    expect(result.legacyCards).toHaveLength(2);
    expect(Object.keys(result.groupedByYear)).toEqual(expect.arrayContaining(['2026', '2025', 'Current']));
    expect(result.groupedByYear['2026']).toHaveLength(1);
    expect(result.groupedByYear['2025'][0].name).toBe('Bob Active');
    expect(result.groupedByYear['Current'][0].name).toBe('No Year');
  });

  it('supports alternate Firestore field names for legacy and year', () => {
    const cards = [
      { name: 'Mentor One', activityYear: 2026 },
      { name: 'Mentor Two', isLegacyMentor: true },
      { name: 'Mentor Three', activity_year: '2025 - 2026' },
    ];

    const result = groupTeamCards(cards);

    expect(result.legacyCards).toHaveLength(1);
    expect(Object.keys(result.groupedByYear)).toEqual(expect.arrayContaining(['2026', '2025 - 2026']));
    expect(result.groupedByYear['2026'][0]).toMatchObject({ name: 'Mentor One', legacy: false, year: 2026 });
    expect(result.groupedByYear['2025 - 2026'][0]).toMatchObject({
      name: 'Mentor Three',
      legacy: false,
      year: '2025 - 2026',
    });
  });
});
