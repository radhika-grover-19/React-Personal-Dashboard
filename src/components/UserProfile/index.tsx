import userAvatar from '../../assets/user-avatar.svg';
import './UserProfile.scss';

function UserProfile({ name = 'Edna Davis', email = 'edna.davis@gmail.com' }) {
  return (
    <div className="profileContainer">
      <img src={userAvatar} alt="profile" className="avatar"/>
      <div>
        <h1 className="name">Welcome, {name}</h1>
        <p className="email">{email}</p>
      </div>
    </div>
  );
}

export default UserProfile;