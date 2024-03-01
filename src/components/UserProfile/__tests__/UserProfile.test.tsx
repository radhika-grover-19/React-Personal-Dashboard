import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '../index';
import userAvatar from '../../../assets/user-avatar.svg';

describe('UserProfile', () => {
  test('renders UserProfile component with name and email', () => {
    render(<UserProfile name="Edna Davis" email="edna.davis@gmail.com" />);

    expect(screen.getByText('Welcome, Edna Davis')).toBeInTheDocument();
    expect(screen.getByText('edna.davis@gmail.com')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toHaveAttribute('src', userAvatar);
  });
});
