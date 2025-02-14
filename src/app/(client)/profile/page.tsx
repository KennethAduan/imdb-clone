import { isFalse, isUndefined } from "@/lib/utils";
import { getUserAction } from "@/server-actions/user.action";
import ProfileForm from "@/components/forms/profile.form";

const ProfilePage = async () => {
  const user = await getUserAction();

  if (isUndefined(user!.data)) {
    return <div>Error: User not found</div>;
  }
  if (isFalse(user!.success)) {
    return <div>Error: {user?.message}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <ProfileForm user={user!.data!} />
      </div>
    </div>
  );
};

export default ProfilePage;
