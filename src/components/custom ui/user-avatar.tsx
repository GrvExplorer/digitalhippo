"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function getInitials(name: string | undefined | null) {
  if (!name) return "??";
  if (name.indexOf(" ") === -1) {
    const nameSplit = name.split("");
    return `${nameSplit[0]}${nameSplit[nameSplit.length - 1]}`;
  }
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0].toLowerCase()}`;
}

// TODO: should work -> generate random color ( https://medium.com/@femiakt/generate-avatar-or-profile-picture-with-username-initials-lettered-avatar-with-react-eae5d2de5ac8#4761)
function generateBackground(name: string) {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function UserAvatar({
  userImage,
  userName,
  userEmail,
}: {
  userImage: string;
  userName: string;
  userEmail: string;
}) {

  if (!userName) {
    const emailSplit = userEmail.split("@");
    userName = emailSplit[0];
  }

  return (
    <Avatar className="relative cursor-pointer">
      {userImage && (
        <AvatarImage className="inline-block bg-gray-300" src={userImage} />
      )}
      <AvatarFallback>
        {getInitials(userName)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
