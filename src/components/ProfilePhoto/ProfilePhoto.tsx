import "../../assets/css/ProfilePhoto/profilephoto.css"

interface ProfilePhotoProps
{
    profilePhoto?: string;
}

export function ProfilePhoto( {profilePhoto}: ProfilePhotoProps )
{
    return(
        <img 
            src={profilePhoto} 
            alt="Foto de perfil"
            className="profile-photo" />
    );
}